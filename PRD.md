# Product Requirements Document (PRD)

## Project: Web-Based 3D Sauna Configurator

**Tech Stack:** React + Three.js (WebGL)
**Version:** Production-Ready (V1)

---

# 1. Product Overview

## 1.1 Objective

Develop an interactive web-based sauna configurator that enables customers to:

* Customize sauna size and layout
* Select materials and finishes
* Add optional features and accessories
* View real-time 3D updates
* See dynamic pricing
* Submit a quote request

The configurator will function as a sales enablement and lead generation tool.

---

# 2. Goals & Success Metrics

## 2.1 Business Goals

* Reduce manual quoting time
* Increase lead conversion rate
* Improve customer engagement time
* Standardize configuration rules

## 2.2 KPIs

* Avg session duration > 3 minutes
* Quote submission rate > 5%
* 3D interaction engagement rate > 60%
* Page load < 3 seconds

---

# 3. Target Users

| User Type   | Description                       | Goals                                 |
| ----------- | --------------------------------- | ------------------------------------- |
| Homeowner   | Planning backyard or indoor sauna | Visualize options, understand pricing |
| Sales Rep   | Using tool during consultation    | Quickly generate accurate quote       |
| Distributor | Configuring for resale            | Generate spec + pricing               |

---

# 4. Scope

## 4.1 Core Modules

1. 3D Visualization Engine (Three.js)
2. Configuration Logic Engine
3. Pricing Engine
4. Quote Generation
5. Admin Panel

---

# 5. Functional Requirements

---

## 5.1 Step-Based Configuration Flow

### Step 1 – Select Sauna Type

* Indoor / Outdoor
* Shape:

  * Rectangular
  * Barrel
  * Custom modular

3D model updates accordingly.

---

### Step 2 – Dimensions

User can adjust:

* Width
* Depth
* Height
* Number of seats/levels

Constraints:

* Min/max values enforced
* Geometry recalculated parametrically

3D updates in real time.

---

### Step 3 – Materials

Options:

* Exterior cladding (e.g., thermowood, cedar, spruce)
* Interior wood type
* Bench material
* Glass door type (clear / tinted / framed)

Material maps change in real-time.

---

### Step 4 – Heating System

Options:

* Electric heater
* Wood-burning stove
* Infrared panels
* Hybrid

Add-ons:

* Stone capacity
* Chimney
* Control panel type

System components appear/disappear in 3D.

---

### Step 5 – Features & Accessories

* LED lighting (strip / spot / RGB)
* Bluetooth sound system
* Ventilation system
* Extra insulation
* Roof upgrade
* Window size & position

Dynamic placement logic required.

---

### Step 6 – Summary & Pricing

Display:

* Configuration summary
* 3D preview (final state)
* Itemized pricing
* Total price
* Estimated delivery time

---

### Step 7 – Quote Request

Form fields:

* Name
* Email
* Phone
* Address
* Notes

Submission sends:

* Configuration JSON
* Pricing breakdown
* Rendered image snapshot (optional)
* PDF summary

---

# 6. Non-Functional Requirements

## 6.1 Performance

* 60 FPS target on desktop
* 30+ FPS on mid-tier mobile
* Model size < 10MB optimized (GLTF + Draco)

## 6.2 Responsiveness

* Desktop-first
* Fully usable on tablet
* Mobile simplified camera controls

## 6.3 Browser Support

* Chrome
* Safari
* Edge
* Firefox (latest 2 versions)

---

# 7. 3D System Architecture

## 7.1 Tech Stack

* React (UI + State)
* Three.js (3D rendering)
* React Three Fiber (recommended abstraction)
* Zustand or Redux for state management
* GLTF models with parametric scaling
* Draco compression

---

## 7.2 3D Rendering Modes

* Realistic (PBR materials)
* Optional simplified mode for mobile

---

## 7.3 Geometry Strategy

Hybrid approach:

* Base GLTF modular components
* Parametric scaling via code
* Boolean operations for cutouts (doors/windows)
* Dynamic instancing for benches

---

# 8. Pricing Engine

## 8.1 Pricing Structure

* Base price by sauna type
* Size multiplier (volume or footprint based)
* Material cost modifiers
* Add-on flat fees
* Heater-dependent cost adjustments

## 8.2 Pricing Logic

* Deterministic rule-based engine
* Stored as JSON rule schema
* Editable from Admin panel

---

# 9. Admin Panel

Features:

* Manage pricing rules
* Add/remove materials
* Upload textures
* Configure heater models
* Enable/disable features
* View submitted configurations

* **Open `/admin` route (demo-only):**
  The admin panel is publicly accessible at `/admin` with no authentication. It is intended strictly for demo environments and internal testing.

* **Structured pricing editor:**
  The interface exposes editable sections for base prices, size rules, material modifiers, heaters, and add-ons. Each field updates a centralized pricing JSON object with input validation (no negatives, required fields enforced).

* **Client-side persistence + instant update:**
  Clicking “Save” writes the pricing configuration to `localStorage` and updates the global state (e.g., Zustand). The public configurator automatically recalculates prices in real time without page refresh.

* **Import / Export / Reset controls:**
  Admin users can export the pricing JSON, import a saved configuration, or reset to default values to quickly restore a clean demo state.


---

# 10. Export & Output

## 10.1 Configuration JSON

Structured schema:

```json
{
  "type": "outdoor_barrel",
  "dimensions": { "width": 2200, "depth": 1800, "height": 2100 },
  "materials": { "exterior": "cedar", "interior": "spruce" },
  "heater": "electric_8kw",
  "addons": ["led_strip", "ventilation"]
}
```

## 10.2 Enhancements

* Generate PDF spec sheet
* Generate DXF layout
* Generate AR preview (WebXR)
* Save configuration link

---

# 11. UX Requirements

* Clean step-based wizard
* Sticky price display
* Reset configuration button
* Undo/redo support
* Tooltip explanations for technical terms
* Loading indicators for texture/model swaps

---

# 15. Acceptance Criteria

* Real-time 3D update without reload
* All constraints enforced
* Accurate pricing calculation
* Successful quote submission
* Stable performance across devices

