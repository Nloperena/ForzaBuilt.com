---
name: Interactive PDF Library with Modal Viewer
overview: ""
todos:
  - id: 54333f7e-fc07-4b8e-9704-3b3c819c1762
    content: Create LibrarySection.tsx component with bookshelf structure
    status: pending
  - id: 24b06554-ad3e-41ef-86cd-4b62764bff28
    content: Add 3D pull-out animations using Framer Motion
    status: pending
  - id: dcb8493f-7219-425a-b505-4ec59142716f
    content: Style bookshelf with shelf background, books, and lighting
    status: pending
  - id: 18c22c04-4826-43e2-bf9e-e91782278c69
    content: Integrate LibrarySection into Index.tsx after newsletter
    status: pending
---

# Interactive PDF Library with Modal Viewer

## Enhanced Design

Instead of navigating away, clicking a book opens a modal overlay with an embedded PDF viewer - creating a seamless, integrated experience.

## Implementation

### Update LibrarySection Component

**File:** `src/components/LibrarySection.tsx`

**Add Modal State:**

- Track selected book
- Modal open/close state
- Escape key handler

**Modal Features:**

- Dark overlay backdrop
- Centered PDF viewer iframe
- Control buttons: Close (X), Download, Open in New Tab
- Click outside to close
- Book opening animation (scale + fade)

**Visual Flow:**

1. User clicks book on shelf
2. Book animates (slight rotation/scale)
3. Modal fades in with PDF embedded
4. User can read, download, or open in new tab
5. Close returns to bookshelf

### Benefits

- No page navigation - stays on homepage
- Preview PDFs inline
- Professional, polished UX
- Leverages existing iframe PDF rendering

### Books Included

- Industrial, Transportation, Marine, Composites, Construction, Insulation brochures
- All use industry brand colors