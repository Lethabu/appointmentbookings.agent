"use client"

import { useState, useEffect } from "react"
import {
  Calendar,
  User,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  Plus,
  Edit3,
  Zap,
  Settings,
  RefreshCw,
  ArrowRight,
  ArrowLeft,
  MessageSquare,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const SmartSchedulingAgent = () => {
  const [currentView, setCurrentView] = useState("calendar")
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [appointments, setAppointments] = useState([])
  const [waitlist, setWaitlist] = useState([])
  const [availableSlots, setAvailableSlots] = useState([])
  const [schedulingMetrics, setSchedulingMetrics] = useState({})
  const [aiRecommendations, setAiRecommendations] = useState([])
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [selectedTherapist, setSelectedTherapist] = useState("all")
  const [selectedRoom, setSelectedRoom] = useState("all")

  // Sample data
  const therapists = [
    { id: "1", name: "Dr. Sarah Johnson", specialty: "Pediatric OT", color: "bg-blue-500" },
    { id: "2", name: "Dr. Michael Chen", specialty: "Hand Therapy", color: "bg-green-500" },
    { id: "3", name: "Dr. Lisa Williams", specialty: "Mental Health OT", color: "bg-purple-500" },
    { id: "4", name: "Dr. James Brown", specialty: "Geriatric OT", color: "bg-orange-500" },
  ]

  const rooms = [
    { id: "1", name: "Assessment Room A", type: "assessment", equipment: ["ADL Kitchen", "Bathroom Setup"] },
    { id: "2", name: "Treatment Room B", type: "treatment", equipment: ["Exercise Equipment", "Sensory Tools"] },
    { id: "3", name: "Pediatric Room", type: "pediatric", equipment: ["Play Therapy", "Sensory Integration"] },
    { id: "4", name: "Telehealth Studio", type: "virtual", equipment: ["Video Setup", "Digital Tools"] },
  ]

  const appointmentTypes = [
    { id: "initial", name: "Initial Assessment", duration: 90, color: "bg-blue-100 text-blue-800" },
    { id: "followup", name: "Follow-up Session", duration: 60, color: "bg-green-100 text-green-800" },
    { id: "group", name: "Group Therapy", duration: 90, color: "bg-purple-100 text-purple-800" },
    { id: "telehealth", name: "Telehealth Session", duration: 45, color: "bg-orange-100 text-orange-800" },
  ]

  // Initialize sample appointments
  useEffect(() => {
    const sampleAppointments = [
      {
        id: "1",
        patientName: "Sarah M.",
        patientId: "PT-001",
        therapistId: "1",
        roomId: "1",
        type: "initial",
        date: "2025-01-15",
        time: "09:00",
        duration: 90,
        status: "confirmed",
        notes: "First assessment for hand injury",
        priority: "high",
        language: "english",
      },
      {
        id: "2",
        patientName: "Thabo K.",
        patientId: "PT-002",
        therapistId: "2",
        roomId: "2",
        type: "followup",
        date: "2025-01-15",
        time: "10:30",
        duration: 60,
        status: "confirmed",
        notes: "Progress review - isiZulu preferred",
        priority: "medium",
        language: "isizulu",
      },
      {
        id: "3",
        patientName: "Maria V.",
        patientId: "PT-003",
        therapistId: "3",
        roomId: "4",
        type: "telehealth",
        date: "2025-01-15",
        time: "14:00",
        duration: 45,
        status: "pending",
        notes: "Remote session - Afrikaans",
        priority: "medium",
        language: "afrikaans",
      },
    ]

    const sampleWaitlist = [
      {
        id: "w1",
        patientName: "John D.",
        patientId: "PT-004",
        requestedDate: "2025-01-16",
        preferredTime: "morning",
        therapistPreference: "1",
        type: "initial",
        priority: "urgent",
        waitingSince: "2025-01-10",
        language: "english",
      },
      {
        id: "w2",
        patientName: "Nomsa P.",
        patientId: "PT-005",
        requestedDate: "2025-01-17",
        preferredTime: "afternoon",
        therapistPreference: "any",
        type: "followup",
        priority: "medium",
        waitingSince: "2025-01-12",
        language: "isixhosa",
      },
    ]

    const sampleMetrics = {
      utilizationRate: 94,
      noShowRate: 8,
      averageWaitTime: 3.2,
      patientSatisfaction: 4.7,
      roomUtilization: 87,
      therapistEfficiency: 92,
      cancelationRate: 12,
      rebookingSuccess: 89,
    }

    const sampleRecommendations = [
      {
        id: "r1",
        type: "optimization",
        title: "Optimize Thursday Schedule",
        description: "Move 2 appointments to reduce therapist overtime and improve patient flow",
        impact: "Save 2 hours, improve efficiency by 15%",
        priority: "high",
      },
      {
        id: "r2",
        type: "waitlist",
        title: "Fill Cancellation Slot",
        description: "John D. from waitlist can fill tomorrow's 10:00 AM cancellation",
        impact: "Reduce wait time by 3 days",
        priority: "medium",
      },
      {
        id: "r3",
        type: "resource",
        title: "Room Allocation Alert",
        description: "Assessment Room A is overbooked next week",
        impact: "Prevent scheduling conflicts",
        priority: "high",
      },
    ]

    setAppointments(sampleAppointments)
    setWaitlist(sampleWaitlist)
    setSchedulingMetrics(sampleMetrics)
    setAiRecommendations(sampleRecommendations)
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const optimizeSchedule = () => {
    setIsOptimizing(true)
    setTimeout(() => {
      setIsOptimizing(false)
      alert("Schedule optimized! 3 improvements applied, saving 4.5 hours this week.")
    }, 3000)
  }

  const processWaitlist = () => {
    alert("Processing waitlist... 2 patients automatically scheduled from available slots.")
  }

  const renderCalendarView = () => (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h3 className="text-xl font-semibold">January 2025</h3>
          <Button variant="outline" size="sm">
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedTherapist} onValueChange={setSelectedTherapist}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Therapists" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Therapists</SelectItem>
              {therapists.map((therapist) => (
                <SelectItem key={therapist.id} value={therapist.id}>
                  {therapist.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Appointment
          </Button>
        </div>
      </div>

      {/* Today's Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Today's Schedule - January 15, 2025</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {appointments.map((appointment) => {
              const therapist = therapists.find((t) => t.id === appointment.therapistId)
              const room = rooms.find((r) => r.id === appointment.roomId)
              const appointmentType = appointmentTypes.find((t) => t.id === appointment.type)

              return (
                <Card key={appointment.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-600">{appointment.time}</div>
                          <div className="text-sm text-gray-500">{appointmentType?.duration}min</div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-medium">{appointment.patientName}</h4>
                            <Badge className={appointmentType?.color}>{appointmentType?.name}</Badge>
                            <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                            <Badge className={getPriorityColor(appointment.priority)}>{appointment.priority}</Badge>
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <div className="flex items-center space-x-4">
                              <span className="flex items-center space-x-1">
                                <User className="h-3 w-3" />
                                <span>{therapist?.name}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <MapPin className="h-3 w-3" />
                                <span>{room?.name}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <MessageSquare className="h-3 w-3" />
                                <span>{appointment.language}</span>
                              </span>
                            </div>
                            {appointment.notes && <div className="text-gray-500">{appointment.notes}</div>}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderWaitlistView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Patient Waitlist</h3>
        <div className="flex items-center space-x-2">
          <Button onClick={processWaitlist} className="bg-blue-600 hover:bg-blue-700">
            <Zap className="h-4 w-4 mr-2" />
            Auto-Schedule Available
          </Button>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {waitlist.map((patient) => {
          const therapist = therapists.find((t) => t.id === patient.therapistPreference)
          const appointmentType = appointmentTypes.find((t) => t.id === patient.type)
          const waitingDays = Math.floor((new Date() - new Date(patient.waitingSince)) / (1000 * 60 * 60 * 24))

          return (
            <Card key={patient.id} className="border-l-4 border-l-orange-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-orange-600">{waitingDays}</div>
                      <div className="text-sm text-gray-500">days</div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium">{patient.patientName}</h4>
                        <Badge className={appointmentType?.color}>{appointmentType?.name}</Badge>
                        <Badge className={getPriorityColor(patient.priority)}>{patient.priority}</Badge>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div className="flex items-center space-x-4">
                          <span>Requested: {patient.requestedDate}</span>
                          <span>Time: {patient.preferredTime}</span>
                          <span>Language: {patient.language}</span>
                        </div>
                        <div>Therapist: {therapist ? therapist.name : "Any available"}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Schedule
                    </Button>
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )

  const renderAnalyticsView = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Scheduling Analytics</h3>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{schedulingMetrics.utilizationRate}%</div>
            <div className="text-sm text-gray-600">Utilization Rate</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{schedulingMetrics.patientSatisfaction}</div>
            <div className="text-sm text-gray-600">Patient Rating</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{schedulingMetrics.averageWaitTime}</div>
            <div className="text-sm text-gray-600">Avg Wait (days)</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{schedulingMetrics.noShowRate}%</div>
            <div className="text-sm text-gray-600">No-Show Rate</div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Therapist Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {therapists.map((therapist) => (
                <div key={therapist.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${therapist.color}`}></div>
                    <span className="font-medium">{therapist.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${85 + Math.random() * 15}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{Math.floor(85 + Math.random() * 15)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Room Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {rooms.map((room) => (
                <div key={room.id} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{room.name}</div>
                    <div className="text-sm text-gray-500">{room.type}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${70 + Math.random() * 25}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{Math.floor(70 + Math.random() * 25)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderOptimizationView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">AI Schedule Optimization</h3>
        <Button onClick={optimizeSchedule} disabled={isOptimizing} className="bg-purple-600 hover:bg-purple-700">
          {isOptimizing ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Zap className="h-4 w-4 mr-2" />}
          {isOptimizing ? "Optimizing..." : "Optimize Schedule"}
        </Button>
      </div>

      {/* AI Recommendations */}
      <div className="space-y-4">
        <h4 className="font-medium">AI Recommendations</h4>
        {aiRecommendations.map((recommendation) => (
          <Card key={recommendation.id} className="border-l-4 border-l-purple-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h5 className="font-medium">{recommendation.title}</h5>
                    <Badge className={getPriorityColor(recommendation.priority)}>{recommendation.priority}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{recommendation.description}</p>
                  <div className="text-sm text-green-600 font-medium">Impact: {recommendation.impact}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Apply
                  </Button>
                  <Button variant="outline" size="sm">
                    Dismiss
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Optimization Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Optimization Impact</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">12.5h</div>
              <div className="text-sm text-gray-600">Time Saved This Week</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">89%</div>
              <div className="text-sm text-gray-600">Rebooking Success</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">-42%</div>
              <div className="text-sm text-gray-600">No-Show Reduction</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">+15%</div>
              <div className="text-sm text-gray-600">Efficiency Gain</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-600 text-white p-3 rounded-lg">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Smart Scheduling Agent</CardTitle>
                  <CardDescription>AI-powered appointment scheduling and resource optimization</CardDescription>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">{schedulingMetrics.utilizationRate}%</div>
                  <div className="text-sm text-gray-500">Utilization Rate</div>
                </div>
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Tabs value={currentView} onValueChange={setCurrentView} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="waitlist">Waitlist</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="optimization">AI Optimization</TabsTrigger>
          </TabsList>

          <TabsContent value="calendar">{renderCalendarView()}</TabsContent>
          <TabsContent value="waitlist">{renderWaitlistView()}</TabsContent>
          <TabsContent value="analytics">{renderAnalyticsView()}</TabsContent>
          <TabsContent value="optimization">{renderOptimizationView()}</TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default SmartSchedulingAgent
