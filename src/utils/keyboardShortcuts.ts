/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Global Keyboard Shortcut and Toast Notification Utility
 * 
 * Supports:
 * - Ctrl + S / Cmd + S: Save data / submit active form / persist LocalStorage
 * - Ctrl + C / Cmd + C: Copy selected text or active item to clipboard
 * - Ctrl + V / Cmd + V: Paste from clipboard into active element
 */

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  description?: string;
}

type ToastListener = (toast: ToastMessage) => void;
const toastListeners: Set<ToastListener> = new Set();

export function subscribeToast(listener: ToastListener): () => void {
  toastListeners.add(listener);
  return () => {
    toastListeners.delete(listener);
  };
}

export function showGlobalToast(title: string, description?: string, type: 'success' | 'info' | 'warning' = 'success'): void {
  const toast: ToastMessage = {
    id: `toast-${Date.now()}-${Math.random()}`,
    type,
    title,
    description
  };
  toastListeners.forEach(listener => listener(toast));
}

/**
 * Triggers a global save action across all active tabs and components
 */
export function triggerGlobalSave(): void {
  window.dispatchEvent(new CustomEvent('app:save-data', { detail: { timestamp: Date.now() } }));
}

/**
 * Reads text from system clipboard if permissions allow
 */
export async function readClipboardText(): Promise<string> {
  try {
    if (navigator.clipboard && navigator.clipboard.readText) {
      return await navigator.clipboard.readText();
    }
  } catch (err) {
    console.warn('Clipboard read permission denied or not supported', err);
  }
  return '';
}

/**
 * Writes text to system clipboard
 */
export async function writeClipboardText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    return true;
  } catch (err) {
    console.warn('Clipboard write failed', err);
    return false;
  }
}
