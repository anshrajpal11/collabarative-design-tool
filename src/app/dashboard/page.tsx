"use client"
import { Plus, LogOut } from "lucide-react"
import { signout } from "~/actions/auth"
import { Button } from "~/components/ui/button"
import { Card,CardContent } from "~/components/ui/card"

const page = () => {
  const projects = [
    {
      id: 1,
      name: "Test Room",
      createdDate: "Created Today",
      color: "bg-rose-300",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
     
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">New design file</h1>
                <p className="text-sm text-gray-600">Create a new design</p>
              </div>
            </div>
          </div>

          <Button variant="outline" onClick={() => signout()} className="flex items-center space-x-2">
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </Button>
        </div>
      </header>

      
      <main className="max-w-7xl mx-auto px-6 py-8">
      
        <div className="flex space-x-8 mb-8">
          <button className="text-gray-900 font-medium border-b-2 border-blue-600 pb-2">My project</button>
         
        </div>

     
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="group cursor-pointer">
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-0">
                  <div className={`${project.color} h-48 flex items-center justify-center relative`}>
                    <h3 className="text-lg font-semibold text-gray-800">{project.name}</h3>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-3">
                <h4 className="font-medium text-gray-900">{project.name}</h4>
                <p className="text-sm text-gray-500 mt-1">{project.createdDate}</p>
              </div>
            </div>
          ))}

          {/* Add New Project Card */}
          <div className="group cursor-pointer">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200 border-dashed border-2 border-gray-300 hover:border-gray-400">
              <CardContent className="p-0">
                <div className="h-48 flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="text-center">
                    <Plus className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Create new project</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Empty State Message */}
        {projects.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
            <p className="text-gray-600 mb-6">Create your first design project to get started</p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Create New Project
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}

export default page
