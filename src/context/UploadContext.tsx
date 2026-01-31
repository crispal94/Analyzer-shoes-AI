'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export type ViewType = 'side' | 'sole' | 'top' | 'other'

interface UploadState {
  side: File | null
  sole: File | null
  top: File | null
  others: File[]
}

interface UploadContextType {
  state: UploadState
  addFiles: (newFiles: File[]) => void
  removeFile: (view: ViewType, index?: number) => void
  assignFileToView: (file: File, view: ViewType) => void
}

const UploadContext = createContext<UploadContextType | undefined>(undefined)

export const UploadProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<UploadState>({
    side: null,
    sole: null,
    top: null,
    others: [],
  })

  const addFiles = (newFiles: File[]) => {
    setState((prev) => {
      const newState = { ...prev }
      const remainingFiles = [...newFiles]

      // Simple auto-fill logic for now: fill empty slots in order
      if (!newState.side && remainingFiles.length > 0) {
        newState.side = remainingFiles.shift()!
      }
      if (!newState.sole && remainingFiles.length > 0) {
        newState.sole = remainingFiles.shift()!
      }
      if (!newState.top && remainingFiles.length > 0) {
        newState.top = remainingFiles.shift()!
      }

      // Add remaining to others
      if (remainingFiles.length > 0) {
        newState.others = [...newState.others, ...remainingFiles]
      }

      return newState
    })
  }

  const assignFileToView = (file: File, view: ViewType) => {
    setState((prev) => {
      // Logic to force assign a specific file to a specific view could go here
      // For now, simple setter
      return {
        ...prev,
        [view]: view === 'other' ? [...prev.others, file] : file,
      }
    })
  }

  const removeFile = (view: ViewType, index?: number) => {
    setState((prev) => {
      if (view === 'other' && typeof index === 'number') {
        return {
          ...prev,
          others: prev.others.filter((_, i) => i !== index),
        }
      }
      // For named slots
      if (view !== 'other') {
        return {
          ...prev,
          [view]: null,
        }
      }
      return prev
    })
  }

  return (
    <UploadContext.Provider value={{ state, addFiles, removeFile, assignFileToView }}>
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
