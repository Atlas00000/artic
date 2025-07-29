"use client"

import React, { useState, useCallback, useMemo, useEffect } from "react"
import { PanelLeft, PanelRight, TreePine, PawPrint, Volume2, VolumeX, Sun, Moon, Sparkles, Snowflake, Thermometer, CloudSnow, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { ErrorBoundary } from "@/components/ui/error-boundary"
import { LoadingOverlay } from "@/components/ui/loading"

// Import our custom hooks
import { useSceneObjects } from "@/hooks/useSceneObjects"
import { useObjectSelection } from "@/hooks/useObjectSelection"
import { useSceneHistory } from "@/hooks/useSceneHistory"
import { useLighting } from "@/hooks/useLighting"
import { useCamera } from "@/hooks/useCamera"

// Import our modular components
import { SceneViewport } from "@/components/scene/SceneViewport"
import { SceneControls } from "@/components/scene/SceneControls"
import { ObjectProperties } from "@/components/scene/ObjectProperties"
import { LightingControls } from "@/components/scene/LightingControls"
import { CameraControls } from "@/components/scene/CameraControls"

// Import utilities
import { createBox, createSphere, createGLTF, generateId, generateName } from "@/utils/objectFactory"
import { SceneObject } from "@/types/scene"
import { FloatingDataPanel } from "@/components/ui/floating-data-panel"
import { polarBearData } from "@/data/polar-bear-data"

// Initial scene objects - empty to start with a clean scene
const initialSceneObjects: SceneObject[] = []

export default function JungleQuest() {
  const { toast } = useToast()

  // Use our custom hooks
  const { sceneObjects, addObject, updateObject, deleteObject, updateObjectProperty } = useSceneObjects()
  const { selectedObjectId, selectObject, clearSelection } = useObjectSelection()
  const { addToHistory, undo, redo, canUndo, canRedo } = useSceneHistory()
  const { directionalLight, pointLight, updateDirectionalLight, updatePointLight } = useLighting()
  const { resetCamera, getCameraRef } = useCamera()
  
  // Local state
  const [environmentPreset, setEnvironmentPreset] = useState<string>("sunset")
  const [showSidebar, setShowSidebar] = useState(false) // Temporarily disabled for admin use
  const [isInitialized, setIsInitialized] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [theme, setTheme] = useState<'day' | 'night'>('day')


  // Initialize scene state only once
  useEffect(() => {
    if (!isInitialized) {
      setIsInitialized(true)
    }
  }, [isInitialized])

  // Get selected object
  const selectedObject = useMemo(
    () => sceneObjects.find((obj) => obj.id === selectedObjectId) || null,
    [selectedObjectId, sceneObjects],
  )

  // Object creation handlers
  const handleAddBox = useCallback(() => {
    const id = generateId()
    const name = generateName("box", sceneObjects.length + 1)
    const newObject = createBox(id, name)
    addObject(newObject)
    selectObject(id)
    addToHistory([...sceneObjects, newObject])
  }, [addObject, selectObject, sceneObjects, addToHistory])

  const handleAddSphere = useCallback(() => {
    const id = generateId()
    const name = generateName("sphere", sceneObjects.length + 1)
    const newObject = createSphere(id, name)
    addObject(newObject)
    selectObject(id)
    addToHistory([...sceneObjects, newObject])
  }, [addObject, selectObject, sceneObjects, addToHistory])

  const handleAddGLTF = useCallback(() => {
    const id = generateId()
    const name = generateName("gltf", sceneObjects.length + 1)
    const newObject = createGLTF(id, name)
    addObject(newObject)
    selectObject(id)
    addToHistory([...sceneObjects, newObject])
  }, [addObject, selectObject, sceneObjects, addToHistory])

  // File upload handler
  const handleModelUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file) {
        if (!file.name.endsWith(".glb") && !file.name.endsWith(".gltf")) {
          toast({
            title: "Invalid file type",
            description: "Please upload a .glb or .gltf file.",
            variant: "destructive",
          })
          return
        }

        setIsUploading(true)
        const reader = new FileReader()
        
        reader.onload = (e) => {
          if (e.target?.result) {
            const blob = new Blob([e.target.result], { type: file.type })
            const objectURL = URL.createObjectURL(blob)
            const id = generateId()
            const name = file.name.split(".")[0] || generateName("gltf", sceneObjects.length + 1)
            const newObject = createGLTF(id, name, objectURL)
            addObject(newObject)
            selectObject(id)
            addToHistory([...sceneObjects, newObject])
            toast({
              title: "Model Uploaded",
              description: `"${file.name}" added to scene.`,
            })
          }
          setIsUploading(false)
        }
        
        reader.onerror = () => {
          toast({
            title: "Upload Failed",
            description: "Could not read the file.",
            variant: "destructive",
          })
          setIsUploading(false)
        }
        
        reader.readAsArrayBuffer(file)
      }
    },
    [addObject, selectObject, sceneObjects, addToHistory, toast],
  )

  // Object property change handler
  const handleObjectPropertyChange = useCallback(
    (property: keyof SceneObject, value: any, axis?: 0 | 1 | 2) => {
      if (!selectedObject) return
      updateObjectProperty(selectedObject.id, property, value, axis)
      const updatedObjects = sceneObjects.map(obj => 
        obj.id === selectedObject.id 
          ? { ...obj, [property]: axis !== undefined && ['position', 'rotation', 'scale'].includes(property)
              ? (() => {
                  const newValue = [...obj[property as keyof SceneObject]] as [number, number, number]
                  newValue[axis] = value
                  return newValue
                })()
              : value
            }
          : obj
      )
      addToHistory(updatedObjects)
    },
    [selectedObject, updateObjectProperty, sceneObjects, addToHistory],
  )

  // Object deletion handler
  const handleDeleteObject = useCallback(() => {
    if (!selectedObject) return
    deleteObject(selectedObject.id)
    clearSelection()
    const updatedObjects = sceneObjects.filter(obj => obj.id !== selectedObject.id)
    addToHistory(updatedObjects)
    toast({
      title: "Object Deleted",
      description: `"${selectedObject.name}" has been removed.`,
    })
  }, [selectedObject, deleteObject, clearSelection, sceneObjects, addToHistory, toast])

  // Cleanup object URLs when components unmount
  useEffect(() => {
    return () => {
      sceneObjects.forEach((obj) => {
        if (obj.type === "gltf" && obj.modelPath?.startsWith("blob:")) {
          URL.revokeObjectURL(obj.modelPath)
        }
      })
    }
  }, [sceneObjects])

  return (
    <ErrorBoundary>
      <div className={`relative w-full h-screen overflow-hidden transition-all duration-500 ${
        theme === 'day' 
          ? 'arctic-gradient snow-pattern' 
          : 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
      }`}>
        {/* Loading overlay for file uploads */}
        {isUploading && (
          <LoadingOverlay text="Uploading model..." />
        )}

        {/* Arctic-themed Header */}
        <header className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-r from-blue-900/95 via-cyan-800/95 to-blue-700/95 backdrop-blur-md border-b-2 border-cyan-400/40 shadow-2xl">
          {/* Animated Snowflakes Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <div
                key={`snow-${i}`}
                className="absolute text-cyan-300/30 animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${3 + Math.random() * 2}s`,
                }}
              >
                ❄
              </div>
            ))}
          </div>

          <div className="relative flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 group cursor-pointer transition-all duration-300 hover:scale-105">
                <div className="relative">
                  <Snowflake className="h-10 w-10 text-cyan-300 animate-spin-slow group-hover:animate-bounce" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                </div>
                <div className="flex flex-col">
                  <h1 className="text-3xl font-bold text-white drop-shadow-lg flex items-center">
                    <span className="text-cyan-300 bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                      Arctic
                    </span>
                    <span className="text-white ml-2">Life</span>
                    <span className="ml-2 text-2xl animate-pulse">❄️</span>
                  </h1>
                  <p className="text-cyan-200 text-sm font-medium">Polar Wildlife Explorer</p>
                </div>
              </div>
              
              <div className="hidden md:flex items-center space-x-6 ml-8">
                <div className="flex items-center space-x-2 bg-cyan-500/20 rounded-full px-4 py-2 border border-cyan-400/30">
                  <PawPrint className="h-4 w-4 text-cyan-300" />
                  <span className="text-cyan-200 text-sm font-medium">3D Polar Explorer</span>
                </div>
                <div className="flex items-center space-x-2 bg-blue-500/20 rounded-full px-4 py-2 border border-blue-400/30">
                  <MapPin className="h-4 w-4 text-blue-300" />
                  <span className="text-blue-200 text-sm font-medium">Arctic Region</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Temperature Display */}
              <div className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full px-4 py-2 border border-red-400/30">
                <Thermometer className="h-4 w-4 text-red-300 animate-pulse" />
                <span className="text-red-200 text-sm font-bold">-15°C</span>
              </div>

              {/* Sound Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="arctic-button text-white hover:bg-cyan-600/50 transition-all duration-300 hover:scale-110"
                aria-label={soundEnabled ? "Disable Sound" : "Enable Sound"}
              >
                {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
              </Button>
              
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'day' ? 'night' : 'day')}
                className="arctic-button text-white hover:bg-cyan-600/50 transition-all duration-300 hover:scale-110"
                aria-label={theme === 'day' ? "Switch to Night Mode" : "Switch to Day Mode"}
              >
                {theme === 'day' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </Button>

              {/* Weather Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="arctic-button text-white hover:bg-cyan-600/50 transition-all duration-300 hover:scale-110"
                aria-label="Toggle Weather Effects"
              >
                <CloudSnow className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Jungle-themed Sidebar */}
        <aside
          className={`absolute top-20 left-0 bottom-0 z-10 w-72 p-4 bg-gradient-to-b from-green-100/95 via-green-50/95 to-green-100/95 backdrop-blur-sm border-r-2 border-green-300/50 overflow-auto transition-all duration-500 ease-in-out ${
            showSidebar ? "translate-x-0" : "-translate-x-full"
          } md:block jungle-shadow`}
        >
          <div className="space-y-6">
            {/* Welcome Section */}
            <div className="text-center p-4 bg-gradient-to-r from-green-200 to-yellow-200 rounded-xl border-2 border-green-300">
              <Sparkles className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <h2 className="text-lg font-bold text-green-800">Welcome to JungleQuest!</h2>
              <p className="text-sm text-green-700 mt-1">Explore amazing animals in 3D! 🦁🐘🦜</p>
            </div>

            {/* Camera Controls */}
            <div className="bg-white/80 rounded-xl p-4 border-2 border-green-200">
              <h3 className="text-lg font-bold text-green-800 mb-3 flex items-center">
                <PawPrint className="h-5 w-5 mr-2" />
                Camera Controls
              </h3>
              <CameraControls onReset={resetCamera} />
            </div>

            {/* Scene Controls */}
            <div className="bg-white/80 rounded-xl p-4 border-2 border-green-200">
              <h3 className="text-lg font-bold text-green-800 mb-3 flex items-center">
                <TreePine className="h-5 w-5 mr-2" />
                Scene Tools
              </h3>
              <SceneControls
                onUndo={undo}
                onRedo={redo}
                canUndo={canUndo}
                canRedo={canRedo}
                onAddBox={handleAddBox}
                onAddSphere={handleAddSphere}
                onAddGLTF={handleAddGLTF}
                onModelUpload={handleModelUpload}
              />
            </div>

            {/* Lighting Controls */}
            <div className="bg-white/80 rounded-xl p-4 border-2 border-green-200">
              <h3 className="text-lg font-bold text-green-800 mb-3 flex items-center">
                <Sun className="h-5 w-5 mr-2" />
                Lighting & Environment
              </h3>
              <LightingControls
                environmentPreset={environmentPreset}
                onEnvironmentChange={setEnvironmentPreset}
                directionalLight={directionalLight}
                pointLight={pointLight}
                onDirectionalLightChange={updateDirectionalLight}
                onPointLightChange={updatePointLight}
              />
            </div>

            {/* Object Properties */}
            <div className="bg-white/80 rounded-xl p-4 border-2 border-green-200">
              <h3 className="text-lg font-bold text-green-800 mb-3 flex items-center">
                <Sparkles className="h-5 w-5 mr-2" />
                Object Properties
              </h3>
              <ObjectProperties
                selectedObject={selectedObject}
                onPropertyChange={handleObjectPropertyChange}
                onDeleteObject={handleDeleteObject}
                onClearSelection={clearSelection}
              />
            </div>
          </div>
        </aside>

        {/* 3D Viewport */}
        <SceneViewport
          sceneObjects={sceneObjects}
          selectedObjectId={selectedObjectId}
          onObjectSelect={selectObject}
          directionalLight={directionalLight}
          pointLight={pointLight}
          environmentPreset={environmentPreset}
          showSidebar={showSidebar}
          orbitControlsRef={getCameraRef()}
        />

        {/* Floating Data Panel */}
        <FloatingDataPanel animal={polarBearData} />
      </div>
    </ErrorBoundary>
  )
}
