'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface UploadContextType {
  files: File[]
  setFiles: (files: File[]) => void
  addFiles: (newFiles: File[]) => void
  removeFile: (index: number) => void
}

const UploadContext = createContext<UploadContextType | undefined>(undefined)

export const UploadProvider = ({ children }: { children: ReactNode }) => {
  const [files, setFiles] = useState<File[]>([])

  const addFiles = (newFiles: File[]) => {
    setFiles((prev) => [...prev, ...newFiles])
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <UploadContext.Provider value={{ files, setFiles, addFiles, removeFile }}>
      {children}
    </UploadContext.Provider>
  )
}

export const useUpload = () => {
  const context = useContext(UploadContext)
  if (context === undefined) {
    throw new Error('useUpload must be used within an UploadProvider')
  }
  return context
}
