<!-- 09e6f7dd-4f5f-447f-9a38-335405df0c9a 5fb84115-bcec-4abb-93c2-c7dc1763285d -->
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

### To-dos

- [ ] Create LibrarySection.tsx component with bookshelf structure
- [ ] Add 3D pull-out animations using Framer Motion
- [ ] Style bookshelf with shelf background, books, and lighting
- [ ] Integrate LibrarySection into Index.tsx after newsletter