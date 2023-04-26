import { useState } from "react"

const DEFAULT_VALUE = {
  email: "",
  password: "",
}

export default function LoginPage() {
  const [value, setValue] = useState<{ email: string, password: string }>(DEFAULT_VALUE)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValue((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(value)
  }

  return (
    <div className="flex justify-center items-center w-full mx-auto max-w-md h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
        <input className="text-black p-2 rounded-md" value={value.email} onChange={handleChange} type="email" name="email" placeholder="Email" />
        <input className="text-black p-2 rounded-md" value={value.password} onChange={handleChange} type="password" name="password" placeholder="Password" />
        <button className="bg-violet-800 p-2 rounded-full font-semibold" type="submit">
          Login
        </button>
      </form>
    </div>
  )
}
