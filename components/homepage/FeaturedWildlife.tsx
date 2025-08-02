"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { PawPrint, Heart, AlertTriangle, Eye } from "lucide-react"

interface WildlifeCard {
  id: string
  name: string
  scientificName: string
  region: string
  conservationStatus: string
  previewModel: string
  funFact: string
}

const featuredWildlife: WildlifeCard[] = [
  {
    id: "polar-bear",
    name: "Polar Bear",
    scientificName: "Ursus maritimus",
    region: "Arctic Life",
    conservationStatus: "Vulnerable",
    previewModel: "/assets/polar-bear-preview.jpg",
    funFact: "Polar bears can smell seals from up to 20 miles away!"
  },
  {
    id: "mountain-goat",
    name: "Mountain Goat",
    scientificName: "Oreamnos americanus",
    region: "Alpine Heights",
    conservationStatus: "Least Concern",
    previewModel: "/assets/mountain-goat-preview.jpg",
    funFact: "Mountain goats can climb near-vertical cliffs with ease!"
  },
  {
    id: "gray-wolf",
    name: "Gray Wolf",
    scientificName: "Canis lupus",
    region: "Forest Realm",
    conservationStatus: "Least Concern",
    previewModel: "/assets/gray-wolf-preview.jpg",
    funFact: "Wolves can communicate over distances of up to 10 miles!"
  }
]

const conservationStatusColors = {
  "Least Concern": "bg-green-500/20 text-green-300 border-green-300",
  "Near Threatened": "bg-yellow-500/20 text-yellow-300 border-yellow-300",
  "Vulnerable": "bg-orange-500/20 text-orange-300 border-orange-300",
  "Endangered": "bg-red-500/20 text-red-300 border-red-300",
  "Critically Endangered": "bg-red-600/20 text-red-400 border-red-400"
}

export function FeaturedWildlife() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-emerald-900/20 to-teal-900/20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Meet the Wildlife
          </h2>
          <p className="text-xl text-emerald-200 max-w-3xl mx-auto">
            Click to explore each animal in 3D
          </p>
        </div>

        {/* Wildlife Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredWildlife.map((animal) => (
            <div
              key={animal.id}
              className="group cursor-pointer transition-all duration-300 hover:scale-105"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border-2 border-white/20 hover:border-emerald-300 transition-all duration-300">
                {/* Animal Preview */}
                <div className="relative mb-4">
                  <div className="w-full h-48 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <PawPrint className="h-16 w-16 text-white mx-auto mb-2" />
                      <p className="text-white font-medium">3D Model</p>
                      <p className="text-emerald-200 text-sm">{animal.name}</p>
                    </div>
                  </div>
                  
                  {/* Conservation Status */}
                  <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium border ${conservationStatusColors[animal.conservationStatus as keyof typeof conservationStatusColors]}`}>
                    {animal.conservationStatus}
                  </div>
                </div>

                {/* Animal Info */}
                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {animal.name}
                    </h3>
                    <p className="text-emerald-200 text-sm italic">
                      {animal.scientificName}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <PawPrint className="h-4 w-4 text-emerald-300" />
                    <span className="text-emerald-200 text-sm">{animal.region}</span>
                  </div>
                  
                  <p className="text-white/80 text-sm">
                    {animal.funFact}
                  </p>
                </div>

                {/* Action Button */}
                <div className="mt-4">
                  <Button
                    size="sm"
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-medium"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-emerald-300 text-emerald-300 hover:bg-emerald-300 hover:text-white font-bold px-8 py-4 rounded-xl"
          >
            <PawPrint className="h-5 w-5 mr-2" />
            View All Wildlife
          </Button>
        </div>
      </div>
    </section>
  )
} 