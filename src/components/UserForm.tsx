"use client"

import { memo, useCallback } from "react"
import { useForm } from "react-hook-form"
import type { CreateUserPayload } from "../../src/hooks/types/user"

interface UserFormProps {
    onAddUser: (user: CreateUserPayload) => void
    isLoading?: boolean
}

const UserForm = memo(({ onAddUser, isLoading = false }: UserFormProps) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreateUserPayload>({
        defaultValues: {
            name: "",
            email: "",
            //   name: "",
        },
    })

    const onSubmit = useCallback(
        (data: CreateUserPayload) => {
            onAddUser(data)
            reset()
        },
        [onAddUser, reset],
    )

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Add New User</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                        type="text"
                        {...register("name", { required: "Name is required" })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="John Doe"
                    />
                    {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address",
                            },
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="john@example.com"
                    />
                    {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Username</label>
                    <input
                        type="text"
                        {...register("name", { required: "Username is required" })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="johndoe"
                    />
                    {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 transition font-medium"
                >
                    {isLoading ? "Adding..." : "Add User"}
                </button>
            </form>
        </div>
    )
})

UserForm.displayName = "UserForm"

export default UserForm
