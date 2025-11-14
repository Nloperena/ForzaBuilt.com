<!-- 37a05929-a679-49bc-92d0-75ade0f6eff6 3ce3088a-5b12-4b59-a226-b4736d7ff157 -->
# UI Refinements Plan

## 1. Made in America Video - Crop/Zoom to Remove Black Lines

**File**: `src/components/MadeInAmericaSection.tsx`

- Add `object-position` or `scale` CSS to the video element (line 23) to zoom in and crop out black lines
- Use `object-position: center` with `scale: 1.1` or similar, or adjust `object-position` to focus on the center content
- Apply via inline style or className

## 2. Sub Menu - Decrease Size Further

**File**: `src/components/Header/HeaderV2.tsx`

- Reduce padding and gap sizes further for Products dropdown (line 68):
- Change `xl:gap-1.5 2xl:gap-2` to `xl:gap-1 2xl:gap-1.5`
- Change `xl:px-1.5 2xl:px-2` to `xl:px-1 2xl:px-1.5`
- Reduce padding further for Industries dropdown (line 48):
- Change `xl:px-0.5 2xl:px-1` to `xl:px-0.25 2xl:px-0.5`
- Reduce font sizes if needed: `xl:text-[12px] 2xl:text-[13px]` to `xl:text-[11px] 2xl:text-[12px]`

## 3. ProductImageTicker - Adjust Negative Margin

**File**: `src/pages/Index.tsx`

- Change negative margin-top from `-mt-72` (18rem) to `-mt-68` (17rem) at xl breakpoint (line 36)
- Update: `-mt-40 md:-mt-56 lg:-mt-64 xl:-mt-68` (was `xl:-mt-72`)

## 4. Performance. Elevated. - Increase Background and Font Size

**File**: `src/components/ExperienceBetterBanner.tsx`

- Increase white background padding (line 97): `py-8 md:py-12` to `py-10 md:py-16 lg:py-20`
- Increase font size for "Performance. Elevated." text (lines 130, 163, 176):
- Change from `clamp(36px, 3.25vw + 0.65rem, 73px)` to `clamp(40px, 3.5vw + 0.7rem, 80px)`

### To-dos

- [ ] Add object-position/scale to Made in America video to crop out black lines
- [ ] Further reduce submenu padding, gaps, and font sizes for all breakpoints
- [ ] Change ProductImageTicker negative margin from -mt-72 to -mt-68 at xl breakpoint
- [ ] Increase Performance. Elevated. banner padding and font size