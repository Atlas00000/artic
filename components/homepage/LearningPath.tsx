"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { BookOpen, Target, Award, Globe } from "lucide-react"

interface LearningModule {
  id: string
  title: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedTime: number
  prerequisites: string[]
  rewards: string[]
}

const learningModules: LearningModule[] = [
  {
    id: "beginner",
    title: "🌱 Beginner",
    description: "Basic wildlife identification and habitat understanding",
    difficulty: "beginner",
    estimatedTime: 15,
    prerequisites: [],
    rewards: ["Wildlife Spotter Badge", "Basic Knowledge Certificate"]
  },
  {
    id: "explorer",
    title: "🌿 Explorer",
    description: "Advanced habitat understanding and conservation basics",
    difficulty: "intermediate",
    estimatedTime: 30,
    prerequisites: ["beginner"],
    rewards: ["Habitat Expert Badge", "Conservation Awareness"]
  },
  {
    id: "expert",
    title: "🌳 Expert",
    description: "Deep conservation knowledge and environmental science",
    difficulty: "advanced",
    estimatedTime: 45,
    prerequisites: ["beginner", "explorer"],
    rewards: ["Conservation Expert Badge", "Environmental Advocate"]
  },
  {
    id: "guardian",
    title: "🌍 Guardian",
    description: "Environmental advocacy and real-world impact",
    difficulty: "advanced",
    estimatedTime: 60,
    prerequisites: ["beginner", "explorer", "expert"],
    rewards: ["Earth Guardian Badge", "Impact Certificate"]
  }
]

const difficultyColors = {
  beginner: "bg-green-500/20 text-green-300 border-green-300",
  intermediate: "bg-yellow-500/20 text-yellow-300 border-yellow-300",
  advanced: "bg-orange-500/20 text-orange-300 border-orange-300"
}

export function LearningPath() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-teal-900/20 to-emerald-900/20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your Learning Path
          </h2>
          <p className="text-xl text-emerald-200 max-w-3xl mx-auto">
            Track your progress through interactive modules and unlock achievements
          </p>
        </div>

        {/* Learning Path */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 to-teal-600 transform -translate-x-1/2 hidden md:block"></div>
          
          {/* Modules */}
          <div className="space-y-8">
            {learningModules.map((module, index) => (
              <div
                key={module.id}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Module Card */}
                <div className="w-full md:w-1/2">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border-2 border-white/20 hover:border-emerald-300 transition-all duration-300 group cursor-pointer">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-white">
                        {module.title}
                      </h3>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium border ${difficultyColors[module.difficulty]}`}>
                        {module.difficulty}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-emerald-200 mb-4">
                      {module.description}
                    </p>

                    {/* Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-4 w-4 text-emerald-300" />
                        <span className="text-white/80 text-sm">
                          {module.estimatedTime} minutes
                        </span>
                      </div>
                      
                      {module.prerequisites.length > 0 && (
                        <div className="flex items-center space-x-2">
                          <Target className="h-4 w-4 text-emerald-300" />
                          <span className="text-white/80 text-sm">
                            Prerequisites: {module.prerequisites.join(", ")}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Rewards */}
                    <div className="space-y-2">
                      <p className="text-emerald-300 text-sm font-medium">Rewards:</p>
                      <div className="flex flex-wrap gap-2">
                        {module.rewards.map((reward, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded-full border border-emerald-300/30"
                          >
                            {reward}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-6">
                      <Button
                        size="sm"
                        className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-medium"
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        Start Module
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Progress Indicator */}
                <div className="hidden md:flex items-center justify-center w-16 h-16 bg-emerald-500 rounded-full border-4 border-white shadow-lg">
                  <Award className="h-8 w-8 text-white" />
                </div>

                {/* Mobile Progress Line */}
                <div className="md:hidden w-1 h-8 bg-gradient-to-b from-emerald-400 to-teal-600 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Globe className="h-5 w-5 mr-2" />
            Start Your Journey
          </Button>
        </div>
      </div>
    </section>
  )
} 