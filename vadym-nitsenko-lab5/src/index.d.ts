import { App } from 'vue'
import { Component } from 'vue'

export interface DocumentDescriptor {
  type: string
  icon: string
  name: string
}

export declare const DocumentUploader: Component

export default function (app: App): void
