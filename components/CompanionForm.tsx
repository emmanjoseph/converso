"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { subjects } from "@/constants"
import { createCompanion } from "@/lib/actions/companion.action"
import { redirect } from "next/navigation"
 
const formSchema = z.object({
  name: z.string().min(2, "Companion is required"),
  subject: z.string().min(2, "Subject is required"),
  topic: z.string().min(2, "Topic is required"),
  voice: z.string().min(2, "Voice is required"),
  style: z.string().min(2, "Style is required"),
  duration:z.coerce.number().min(1, "Duration must be atleat one minute")
})



const CompanionForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      subject:"",
      topic:"",
      voice:"",
      style:"",
      duration:1

    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values)
     const companion = await createCompanion(values);
     if (companion) {
       redirect(`/companions/${companion.id}`);
     }else {
       console.log("Failed to create companion");
       redirect("/")
       
     }
  }
  return (
    <>
       <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 space-y-6">
        {/* name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Companion name</FormLabel>
              <FormControl>
                <Input placeholder="Enter companion name" {...field} className="input h-11" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* subject */}
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Companion subject</FormLabel>
              <FormControl>
                
                    <Select
                     onValueChange={field.onChange}
                     value={field.value}
                     defaultValue={field.value}
                    >
      <SelectTrigger className="input h-11 capitalize">
        <SelectValue placeholder="Select a companion subject" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          
           {subjects.map((subject)=> (
              <SelectItem key={subject} value={subject}>
                 {subject}
              </SelectItem>
           ))}
        </SelectGroup>
      </SelectContent>
    </Select>

              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* topic */}
         <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What should the companion help with ?</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Math homework" {...field} className="input h-11" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

         {/* voice */}
        <FormField
          control={form.control}
          name="voice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Voice type</FormLabel>
              <FormControl>
                
                    <Select
                     onValueChange={field.onChange}
                     value={field.value}
                     defaultValue={field.value}
                    >
      <SelectTrigger className="input h-11">
        <SelectValue placeholder="Select a voice type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
           {["male","female"].map((voice)=> (
              <SelectItem key={voice} value={voice}>
                 {voice}
              </SelectItem>
           ))}
        </SelectGroup>
      </SelectContent>
    </Select>

              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

         {/* style */}
        <FormField
          control={form.control}
          name="style"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Speaking style</FormLabel>
              <FormControl>
                
                    <Select
                     onValueChange={field.onChange}
                     value={field.value}
                     defaultValue={field.value}
                    >
      <SelectTrigger className="input h-11">
        <SelectValue placeholder="Select a speaking style" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
           {["formal","informal"].map((style)=> (
              <SelectItem key={style} value={style}>
                 {style}
              </SelectItem>
           ))}
        </SelectGroup>
      </SelectContent>
    </Select>

              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

         {/* time */}
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How long should the companion last ?</FormLabel>
              <FormControl>
                <Input placeholder="Ex. 15" {...field} type="number" className="input h-11" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full rounded-xl cursor-pointer bg-[#FE5933]">Build a companion</Button>
      </form>
    </Form>
    </>
  )
}

export default CompanionForm