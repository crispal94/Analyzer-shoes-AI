'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export type RequiredView = 'side' | 'sole' | 'top'
export type ViewType = RequiredView | 'other'

export const REQUIRED_VIEWS: RequiredView[] = ['side', 'sole', 'top']

export const VIEW_LABELS: Record<RequiredView, string> = {
  side: 'Side View',
  sole: 'Sole View',
  top: 'Top View',
}

export const VIEW_INSTRUCTIONS: Record<RequiredView, string> = {
  side: 'Hold the shoe sideways so the profile and midsole are fully visible.',
  sole: 'Flip the shoe and capture the full outsole tread pattern.',
  top: 'Shoot from above so the toebox, laces, and upper are in frame.',
}

export interface UploadState {
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
  requiredCount: number
  isComplete: boolean
  nextEmptyView: RequiredView | null
}

export const getNextEmptyView = (state: UploadState): RequiredView | null =>
  REQUIRED_VIEWS.find((view) => !state[view]) ?? null

export const countRequiredPhotos = (state: UploadState) =>
  REQUIRED_VIEWS.filter((view) => Boolean(state[view])).length

export const isImageFile = (file: File) =>
  file.type.startsWith('image/') || /\.(jpe?g|png|webp|gif|heic|heif)$/i.test(file.name)

const UploadContext = createContext<UploadContextType | undefined>(undefined)

export const UploadProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<UploadState>({
    side: null,
    sole: null,
    top: null,
    others: [],
  })

  const addFiles = (newFiles: File[]) => {
    const imageFiles = newFiles.filter(isImageFile)

    if (imageFiles.length === 0) {
      return
    }

    setState((prev) => {
      const newState = { ...prev }
      const remainingFiles = [...imageFiles]

      // Auto-fill empty slots in order: side → sole → top
      for (const view of REQUIRED_VIEWS) {
        if (!newState[view] && remainingFiles.length > 0) {
          newState[view] = remainingFiles.shift()!
        }
      }

      if (remainingFiles.length > 0) {
        newState.others = [...newState.others, ...remainingFiles]
      }

      return newState
    })
  }

  const assignFileToView = (file: File, view: ViewType) => {
    setState((prev) => {
      if (view === 'other') {
        return {
          ...prev,
          others: [...prev.others, file],
        }
      }

      return {
        ...prev,
        [view]: file,
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

  const requiredCount = countRequiredPhotos(state)

  return (
    <UploadContext.Provider
      value={{
        addFiles,
        assignFileToView,
        isComplete: requiredCount === REQUIRED_VIEWS.length,
        nextEmptyView: getNextEmptyView(state),
        removeFile,
        requiredCount,
        state,
      }}
    >
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
