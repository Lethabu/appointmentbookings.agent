"use client"

import { useState } from "react"
import {
  Brain,
  Users,
  FileText,
  Calendar,
  BarChart3,
  Settings,
  Globe,
  ClipboardList,
  ArrowRight,
  CheckCircle,
  Clock,
  Shield,
  Activity,
  Heart,
  Zap,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const MentalWellnessAIDashboard = () => {
  const [activeAgent, setActiveAgent] = useState(null)
  const [selectedPractitionerType, setSelectedPractitionerType] = useState("all")

  const practitionerTypes = [
    { id: "psychologist", name: "Psychologists", icon: Brain, color: "bg-blue-500" },
    { id: "counsellor", name: "Counsellors", icon: Heart, color: "bg-pink-500" },
    { id: "coach", name: "Wellness Coaches", icon: Star, color: "bg-yellow-500" },
    { id: "therapist", name: "Therapists", icon: Users, color: "bg-green-500" },
    { id: "social_worker", name: "Social Workers", icon: Shield, color: "bg-purple-500" },
    { id: "holistic", name: "Holistic Healers", icon: Zap, color: "bg-orange-500" },
    { id: "school", name: "School Wellness", icon: Activity, color: "bg-indigo-500" },
  ]

  const agents = [
    {
      id: "smart-intake",
      name: "Smart Intake Agent",
      description: "Multi-lingual intake forms with smart triage and WhatsApp integration",
      icon: Users,
      status: "active",
      efficiency: "94%",
      timeSaved: "2.5 hours/patient",
      supportedTypes: ["psychologist", "counsellor", "coach", "therapist", "social_worker", "holistic", "school"],
      features: [
        "12-language support including SASL",
        "Smart triage with mood & urgency flagging",
        "WhatsApp/SMS/Email integration",
        "Secure ID verification & consent capture",
        "Cultural validation layers",
      ],
      metrics: {
        patientsProcessed: 2847,
        averageTime: "12 minutes",
        accuracyRate: "96%",
        satisfactionScore: 4.8,
      },
    },
    {
      id: "clinical-assessment",
      name: "Clinical Assessment Agent",
      description: "Comprehensive assessments with PHQ-9, GAD-7, DASS-21, and custom tools",
      icon: ClipboardList,
      status: "active",
      efficiency: "91%",
      timeSaved: "1.8 hours/assessment",
      supportedTypes: ["psychologist", "counsellor", "therapist", "social_worker", "school"],
      features: [
        "PHQ-9, GAD-7, WHO-5, DASS-21 support",
        "Custom assessment tool uploads",
        "Emotional tone tracking",
        "Personalized resource suggestions",
        "Risk assessment with escalation",
      ],
      metrics: {
        assessmentsCompleted: 1923,
        clinicalAccuracy: "93%",
        riskDetection: "98%",
        resourceMatch: "89%",
      },
    },
    {
      id: "documentation",
      name: "AI Documentation Agent",
      description: "Real-time transcription with auto-SOAP notes and EHR integration",
      icon: FileText,
      status: "active",
      efficiency: "97%",
      timeSaved: "3.2 hours/day",
      supportedTypes: ["psychologist", "counsellor", "therapist", "social_worker"],
      features: [
        "Real-time Whisper transcription",
        "Auto-SOAP note generation",
        "EHR-ready exports",
        "Session tagging & retrieval",
        "Clinical terminology recognition",
      ],
      metrics: {
        sessionsDocumented: 5634,
        documentationAccuracy: "94%",
        processingSpeed: "0.8s",
        ehrIntegration: "100%",
      },
    },
    {
      id: "feedback-followup",
      name: "Feedback & Follow-Up Agent",
      description: "Post-session check-ins with progress tracking and relapse prevention",
      icon: Heart,
      status: "active",
      efficiency: "88%",
      timeSaved: "45 min/week",
      supportedTypes: ["psychologist", "counsellor", "coach", "therapist", "holistic"],
      features: [
        "Post-session automated check-ins",
        "Progress journaling with AI prompts",
        "Early relapse warning alerts",
        "Voice/video message delivery",
        "Mood trend analysis",
      ],
      metrics: {
        checkInsCompleted: 8921,
        engagementRate: "76%",
        relapsePreventionRate: "84%",
        patientRetention: "91%",
      },
    },
    {
      id: "crisis-intervention",
      name: "Crisis Intervention Agent",
      description: "24/7 crisis assessment with safety planning and emergency protocols",
      icon: Shield,
      status: "active",
      efficiency: "99%",
      timeSaved: "Critical response time",
      supportedTypes: ["psychologist", "counsellor", "therapist", "social_worker", "school"],
      features: [
        "24/7 crisis assessment availability",
        "Automated safety planning",
        "Emergency contact notifications",
        "Crisis hotline integration",
        "Mobile response team coordination",
      ],
      metrics: {
        crisisInterventions: 234,
        responseTime: "< 2 minutes",
        safetyPlanSuccess: "97%",
        emergencyPrevention: "89%",
      },
    },
    {
      id: "billing-insurance",
      name: "Insurance & Billing Agent",
      description: "Complete billing cycle automation from session notes to payment",
      icon: BarChart3,
      status: "beta",
      efficiency: "85%",
      timeSaved: "4 hours/week",
      supportedTypes: ["psychologist", "counsellor", "therapist"],
      features: [
        "Automatic CPT code assignment",
        "Prior authorization requests",
        "Claims submission & appeals",
        "Payment plan management",
        "Denial prediction & correction",
      ],
      metrics: {
        claimsProcessed: 1456,
        approvalRate: "92%",
        collectionIncrease: "28%",
        denialReduction: "67%",
      },
    },
    {
      id: "smart-scheduling",
      name: "Smart Scheduling Agent",
      description: "AI-powered scheduling with cultural preferences and resource optimization",
      icon: Calendar,
      status: "active",
      efficiency: "93%",
      timeSaved: "25 min/day",
      supportedTypes: ["psychologist", "counsellor", "coach", "therapist", "social_worker", "holistic", "school"],
      features: [
        "Multi-language appointment booking",
        "Cultural preference matching",
        "Resource optimization",
        "Waitlist automation",
        "No-show prediction & prevention",
      ],
      metrics: {
        appointmentsScheduled: 12847,
        utilizationRate: "96%",
        noShowReduction: "45%",
        patientSatisfaction: 4.7,
      },
    },
    {
      id: "treatment-adherence",
      name: "Treatment Adherence Agent",
      description: "Engagement monitoring with dropout prediction and retention strategies",
      icon: Activity,
      status: "beta",
      efficiency: "82%",
      timeSaved: "1.5 hours/week",
      supportedTypes: ["psychologist", "counsellor", "coach", "therapist", "holistic"],
      features: [
        "Attendance pattern analysis",
        "Dropout risk prediction",
        "Personalized engagement strategies",
        "Homework adherence tracking",
        "Motivation messaging",
      ],
      metrics: {
        patientsMonitored: 3421,
        dropoutReduction: "38%",
        adherenceImprovement: "52%",
        completionRate: "87%",
      },
    },
  ]

  const systemMetrics = {
    totalTimeSaved: "300+ hours/month",
    patientSatisfaction: 4.7,
    clinicalAccuracy: "94%",
    complianceRate: "100%",
    costReduction: "72%",
    efficiencyGain: "91%",
    languagesSupported: 12,
    practitionerTypes: 7,
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "beta":
        return "bg-yellow-100 text-yellow-800"
      case "development":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4" />
      case "beta":
        return <Clock className="h-4 w-4" />
      case "development":
        return <Settings className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const filteredAgents =
    selectedPractitionerType === "all"
      ? agents
      : agents.filter((agent) => agent.supportedTypes.includes(selectedPractitionerType))

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-xl">
              <Brain className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Mental Wellness AI Agent Army</h1>
              <p className="text-gray-600">Comprehensive AI Platform for Mental Health & Wellness Practitioners</p>
            </div>
          </div>

          {/* Practitioner Type Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Button
              variant={selectedPractitionerType === "all" ? "default" : "outline"}
              onClick={() => setSelectedPractitionerType("all")}
              className="flex items-center space-x-2"
            >
              <span>All Practitioners</span>
            </Button>
            {practitionerTypes.map((type) => {
              const Icon = type.icon
              return (
                <Button
                  key={type.id}
                  variant={selectedPractitionerType === type.id ? "default" : "outline"}
                  onClick={() => setSelectedPractitionerType(type.id)}
                  className="flex items-center space-x-2"
                >
                  <Icon className="h-4 w-4" />
                  <span>{type.name}</span>
                </Button>
              )
            })}
          </div>

          {/* System Overview Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{systemMetrics.totalTimeSaved}</div>
                <div className="text-sm text-gray-600">Time Saved</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{systemMetrics.patientSatisfaction}</div>
                <div className="text-sm text-gray-600">Patient Rating</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{systemMetrics.clinicalAccuracy}</div>
                <div className="text-sm text-gray-600">Clinical Accuracy</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">{systemMetrics.complianceRate}</div>
                <div className="text-sm text-gray-600">Compliance</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-pink-600">{systemMetrics.costReduction}</div>
                <div className="text-sm text-gray-600">Cost Reduction</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-indigo-600">{systemMetrics.efficiencyGain}</div>
                <div className="text-sm text-gray-600">Efficiency</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-teal-600">{systemMetrics.languagesSupported}</div>
                <div className="text-sm text-gray-600">Languages</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">{systemMetrics.practitionerTypes}</div>
                <div className="text-sm text-gray-600">Specialties</div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="agents" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="agents">AI Agents</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
          </TabsList>

          <TabsContent value="agents" className="space-y-6">
            {/* AI Agents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAgents.map((agent) => {
                const Icon = agent.icon
                return (
                  <Card key={agent.id} className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-3 rounded-lg group-hover:from-blue-200 group-hover:to-purple-200 transition-all">
                            <Icon className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{agent.name}</CardTitle>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge className={getStatusColor(agent.status)}>
                                {getStatusIcon(agent.status)}
                                <span className="ml-1 capitalize">{agent.status}</span>
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                      <CardDescription>{agent.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Performance Metrics */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-green-50 rounded-lg p-3">
                            <div className="text-lg font-bold text-green-600">{agent.efficiency}</div>
                            <div className="text-sm text-green-700">Efficiency</div>
                          </div>
                          <div className="bg-blue-50 rounded-lg p-3">
                            <div className="text-lg font-bold text-blue-600">{agent.timeSaved}</div>
                            <div className="text-sm text-blue-700">Time Saved</div>
                          </div>
                        </div>

                        {/* Supported Practitioner Types */}
                        <div>
                          <h4 className="font-medium text-gray-800 mb-2">Supported Practitioners</h4>
                          <div className="flex flex-wrap gap-1">
                            {agent.supportedTypes.slice(0, 4).map((typeId) => {
                              const type = practitionerTypes.find((t) => t.id === typeId)
                              return (
                                <Badge key={typeId} variant="secondary" className="text-xs">
                                  {type?.name.split(" ")[0]}
                                </Badge>
                              )
                            })}
                            {agent.supportedTypes.length > 4 && (
                              <Badge variant="secondary" className="text-xs">
                                +{agent.supportedTypes.length - 4} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Key Features */}
                        <div>
                          <h4 className="font-medium text-gray-800 mb-2">Key Features</h4>
                          <div className="space-y-1">
                            {agent.features.slice(0, 3).map((feature, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                <span className="text-sm text-gray-600">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-2 pt-2">
                          <Button
                            className="flex-1"
                            onClick={() => setActiveAgent(agent.id)}
                            disabled={agent.status === "development"}
                          >
                            {agent.status === "development" ? "Coming Soon" : "Launch Agent"}
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Performance Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>System Performance</CardTitle>
                  <CardDescription>Real-time metrics across all AI agents and practitioner types</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Overall Efficiency</span>
                      <span className="text-2xl font-bold text-green-600">91%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "91%" }}></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">15,847</div>
                        <div className="text-sm text-gray-600">Patients Served</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">99.2%</div>
                        <div className="text-sm text-gray-600">Uptime</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* ROI Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>ROI Analysis</CardTitle>
                  <CardDescription>Financial impact across all mental wellness practices</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-green-600">R 2,847,500</div>
                      <div className="text-sm text-green-700">Monthly Savings Across Platform</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-lg font-bold text-gray-800">12.8x</div>
                        <div className="text-sm text-gray-600">Average ROI Multiple</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-gray-800">2.1 months</div>
                        <div className="text-sm text-gray-600">Avg Payback Period</div>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <div className="text-sm text-gray-600 mb-2">Cost Breakdown</div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Administrative Cost Reduction</span>
                          <span className="text-sm font-medium">R 1,847,200</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Increased Billable Hours</span>
                          <span className="text-sm font-medium">R 672,400</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Improved Patient Retention</span>
                          <span className="text-sm font-medium">R 327,900</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Practitioner Type Performance */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Performance by Practitioner Type</CardTitle>
                  <CardDescription>Efficiency and satisfaction metrics across specialties</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {practitionerTypes.map((type) => {
                      const Icon = type.icon
                      const efficiency = 85 + Math.random() * 15
                      const satisfaction = 4.2 + Math.random() * 0.8
                      return (
                        <div key={type.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 ${type.color} rounded-lg flex items-center justify-center`}>
                              <Icon className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <div className="font-medium">{type.name}</div>
                              <div className="text-sm text-gray-600">
                                {Math.floor(Math.random() * 500 + 200)} practitioners
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-6">
                            <div className="text-center">
                              <div className="text-lg font-bold text-green-600">{efficiency.toFixed(1)}%</div>
                              <div className="text-xs text-gray-600">Efficiency</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-blue-600">{satisfaction.toFixed(1)}</div>
                              <div className="text-xs text-gray-600">Satisfaction</div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Regulatory Compliance</CardTitle>
                  <CardDescription>POPIA, HPCSA, and international standards compliance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-green-500" />
                      <span className="text-sm">POPIA Compliant</span>
                      <Badge className="bg-green-100 text-green-800">Verified</Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-green-500" />
                      <span className="text-sm">HPCSA Standards</span>
                      <Badge className="bg-green-100 text-green-800">Certified</Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-green-500" />
                      <span className="text-sm">HIPAA Compliant</span>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-green-500" />
                      <span className="text-sm">ISO 27001 Security</span>
                      <Badge className="bg-green-100 text-green-800">Certified</Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-green-500" />
                      <span className="text-sm">Clinical Documentation Standards</span>
                      <Badge className="bg-green-100 text-green-800">Validated</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Language & Cultural Compliance</CardTitle>
                  <CardDescription>Multi-language support with cultural validation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Globe className="h-5 w-5 text-blue-500" />
                      <span className="text-sm">12 Official SA Languages</span>
                      <Badge className="bg-blue-100 text-blue-800">Complete</Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Globe className="h-5 w-5 text-blue-500" />
                      <span className="text-sm">South African Sign Language</span>
                      <Badge className="bg-blue-100 text-blue-800">Supported</Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Globe className="h-5 w-5 text-blue-500" />
                      <span className="text-sm">Cultural Validation Layers</span>
                      <Badge className="bg-blue-100 text-blue-800">Active</Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Globe className="h-5 w-5 text-blue-500" />
                      <span className="text-sm">Traditional Healing Integration</span>
                      <Badge className="bg-blue-100 text-blue-800">Enabled</Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Globe className="h-5 w-5 text-blue-500" />
                      <span className="text-sm">Community Context Awareness</span>
                      <Badge className="bg-blue-100 text-blue-800">Optimized</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Clinical Safety & Ethics</CardTitle>
                  <CardDescription>Human oversight and ethical AI implementation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-800">Human Oversight</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Licensed clinician review required</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">AI flags complex cases</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Regular calibration checks</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-800">Bias Prevention</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Diverse training data</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Algorithmic auditing</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Cultural competency integration</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-800">Transparency</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Clear AI disclosure</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Explainable decisions</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Human-only option available</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Starter Plan */}
              <Card className="border-2 border-gray-200">
                <CardHeader>
                  <CardTitle className="text-xl">Starter</CardTitle>
                  <CardDescription>Solo practitioner / side hustle</CardDescription>
                  <div className="text-3xl font-bold text-gray-900">
                    R799<span className="text-lg font-normal">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Smart Intake Agent</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">1 Assessment Type</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">3 Languages</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Basic Documentation</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Up to 50 patients/month</span>
                    </div>
                  </div>
                  <Button className="w-full mt-6">Start Free Trial</Button>
                </CardContent>
              </Card>

              {/* Pro Plan */}
              <Card className="border-2 border-blue-500 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-500 text-white">Most Popular</Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">Pro</CardTitle>
                  <CardDescription>Growing practice</CardDescription>
                  <div className="text-3xl font-bold text-blue-600">
                    R1,799<span className="text-lg font-normal">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">All 12 Languages</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">All AI Agents</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Up to 200 patients/month</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">EHR Integration</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Priority Support</span>
                    </div>
                  </div>
                  <Button className="w-full mt-6">Start Free Trial</Button>
                </CardContent>
              </Card>

              {/* Scale Plan */}
              <Card className="border-2 border-purple-500">
                <CardHeader>
                  <CardTitle className="text-xl">Scale</CardTitle>
                  <CardDescription>Clinics & wellness centers</CardDescription>
                  <div className="text-3xl font-bold text-purple-600">
                    R3,499<span className="text-lg font-normal">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Unlimited Workflows</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Team Accounts</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Advanced Analytics</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Custom Integrations</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Dedicated Support</span>
                    </div>
                  </div>
                  <Button className="w-full mt-6">Contact Sales</Button>
                </CardContent>
              </Card>

              {/* Enterprise Plan */}
              <Card className="border-2 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-xl">Enterprise</CardTitle>
                  <CardDescription>Hospitals / NGOs / Schools</CardDescription>
                  <div className="text-3xl font-bold text-gray-800">Custom</div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">SLA Guarantees</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Dedicated Agents</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">White-labeled Portal</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">On-premise Deployment</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">24/7 Support</span>
                    </div>
                  </div>
                  <Button className="w-full mt-6">Contact Sales</Button>
                </CardContent>
              </Card>
            </div>

            {/* Add-ons */}
            <Card>
              <CardHeader>
                <CardTitle>Add-ons & Extensions</CardTitle>
                <CardDescription>Enhance your AI Agent Army with specialized features</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Team Seats</h4>
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      R249<span className="text-sm font-normal">/seat/month</span>
                    </div>
                    <p className="text-sm text-gray-600">Additional practitioner accounts</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Offline Agent Pack</h4>
                    <div className="text-2xl font-bold text-green-600 mb-2">
                      R999<span className="text-sm font-normal"> once-off</span>
                    </div>
                    <p className="text-sm text-gray-600">Rural & low-connectivity support</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Custom Assessments</h4>
                    <div className="text-2xl font-bold text-purple-600 mb-2">
                      R499<span className="text-sm font-normal">/setup</span>
                    </div>
                    <p className="text-sm text-gray-600">Upload your own assessment tools</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Voice Journals</h4>
                    <div className="text-2xl font-bold text-orange-600 mb-2">
                      R299<span className="text-sm font-normal">/month</span>
                    </div>
                    <p className="text-sm text-gray-600">AI-powered voice journaling</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Launch Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Launch</CardTitle>
            <CardDescription>Start using AI agents for your mental wellness practice immediately</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button className="h-16 flex flex-col items-center justify-center space-y-2">
                <Users className="h-6 w-6" />
                <span>Smart Intake</span>
              </Button>
              <Button
                variant="outline"
                className="h-16 flex flex-col items-center justify-center space-y-2 bg-transparent"
              >
                <ClipboardList className="h-6 w-6" />
                <span>Clinical Assessment</span>
              </Button>
              <Button
                variant="outline"
                className="h-16 flex flex-col items-center justify-center space-y-2 bg-transparent"
              >
                <FileText className="h-6 w-6" />
                <span>Documentation</span>
              </Button>
              <Button
                variant="outline"
                className="h-16 flex flex-col items-center justify-center space-y-2 bg-transparent"
              >
                <Shield className="h-6 w-6" />
                <span>Crisis Intervention</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default MentalWellnessAIDashboard
