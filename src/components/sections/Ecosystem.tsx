"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Info, ArrowRight, X, Layers, Settings, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { materialCatalog, MaterialGrade } from "@/data/catalog";

interface Node {
  id: string;
  label: string;
  type: "root" | "family" | "grade";
  family?: string;
  x: number;
  y: number;
  size: number;
  color: string;
  details?: MaterialGrade;
}

interface LinkLine {
  source: string;
  target: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
}

export default function Ecosystem() {
  const [selectedGrade, setSelectedGrade] = useState<MaterialGrade | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFamilyFilter, setActiveFamilyFilter] = useState<string>("All");
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const families = [
    { name: "Carbon Steel", color: "var(--color-steel)" },
    { name: "Alloy Steel", color: "var(--color-blue)" },
    { name: "Tool Steel", color: "var(--color-orange)" },
    { name: "Stainless Steel", color: "#8A9A86" },
    { name: "Aluminium", color: "#E0E0E0" },
    { name: "Hard Chrome", color: "#A5C7E2" }
  ];

  // Calculate coordinates in a star layout
  const graphData = useMemo(() => {
    const nodes: Node[] = [];
    const links: LinkLine[] = [];

    // 1. Root Node
    const rootX = 400;
    const rootY = 300;
    nodes.push({
      id: "root",
      label: "Bab Al Khibrah",
      type: "root",
      x: rootX,
      y: rootY,
      size: 45,
      color: "var(--color-orange)"
    });

    // 2. Family Nodes (Orbiting Root)
    const familyRadius = 120;
    families.forEach((fam, index) => {
      const angle = (index * 2 * Math.PI) / families.length - Math.PI / 6;
      const famX = rootX + familyRadius * Math.cos(angle);
      const famY = rootY + familyRadius * Math.sin(angle);
      const famId = `fam-${fam.name.replace(/\s+/g, "").toLowerCase()}`;

      nodes.push({
        id: famId,
        label: fam.name,
        type: "family",
        family: fam.name,
        x: famX,
        y: famY,
        size: 30,
        color: fam.color
      });

      links.push({
        source: "root",
        target: famId,
        sourceX: rootX,
        sourceY: rootY,
        targetX: famX,
        targetY: famY
      });

      // 3. Grade Nodes (Orbiting Family)
      const gradesInFamily = materialCatalog.filter(g => g.family === fam.name);
      const gradeRadius = 75;
      
      gradesInFamily.forEach((grade, gIndex) => {
        // Distribute grades around family node
        const gAngle = angle + ((gIndex - (gradesInFamily.length - 1) / 2) * 0.45);
        const gradeX = famX + gradeRadius * Math.cos(gAngle);
        const gradeY = famY + gradeRadius * Math.sin(gAngle);
        const gradeId = `grade-${grade.grade.replace(/[^a-zA-Z0-9]/g, "").toLowerCase()}`;

        nodes.push({
          id: gradeId,
          label: grade.grade,
          type: "grade",
          family: fam.name,
          x: gradeX,
          y: gradeY,
          size: 22,
          color: fam.color,
          details: grade
        });

        links.push({
          source: famId,
          target: gradeId,
          sourceX: famX,
          sourceY: famY,
          targetX: gradeX,
          targetY: gradeY
        });
      });
    });

    return { nodes, links };
  }, []);

  // Filter conditions
  const filteredNodes = useMemo(() => {
    let list = graphData.nodes;

    // Search query filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      list = list.filter(node => 
        node.label.toLowerCase().includes(query) || 
        (node.details?.equivalents.aisi?.toLowerCase().includes(query)) ||
        (node.details?.equivalents.din?.toLowerCase().includes(query))
      );
    }

    // Family filter
    if (activeFamilyFilter !== "All") {
      list = list.filter(node => 
        node.type === "root" || 
        node.family === activeFamilyFilter || 
        (node.type === "family" && node.label === activeFamilyFilter)
      );
    }

    return list;
  }, [graphData, searchQuery, activeFamilyFilter]);

  const activeNodeIds = useMemo(() => new Set(filteredNodes.map(n => n.id)), [filteredNodes]);

  // Determine highlight paths when hovered
  const highlightedNodeIds = useMemo(() => {
    const set = new Set<string>();
    if (!hoveredNodeId) return set;

    set.add(hoveredNodeId);
    
    // If root hovered, highlight root only
    if (hoveredNodeId === "root") return set;

    // Highlight linked nodes
    graphData.links.forEach(link => {
      if (link.source === hoveredNodeId) {
        set.add(link.target);
      }
      if (link.target === hoveredNodeId) {
        set.add(link.source);
      }
    });

    return set;
  }, [hoveredNodeId, graphData]);

  return (
    <section id="ecosystem" className="py-24 bg-graphite border-y border-steel/15 relative overflow-hidden">
      {/* CAD technical coordinate lines decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-steel/10"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-steel/10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="font-mono text-xs uppercase tracking-widest text-orange font-semibold">
            Interactive Database Map
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-white">
            Material Specification Ecosystem
          </h2>
          <p className="font-sans text-base text-steel leading-relaxed">
            Click on any steel grade or family bubble to explore equivalents, conditions, forms, and request a tailored quote instantly. Use the search bar to locate specific standard grades.
          </p>
        </div>

        {/* Search & Filter Desk */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 bg-background border border-steel/10 p-4 rounded-sm">
          {/* Family Filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveFamilyFilter("All")}
              className={`font-sans text-xs uppercase tracking-wider px-3.5 py-2 rounded-sm border transition-colors ${
                activeFamilyFilter === "All"
                  ? "bg-orange border-orange text-white"
                  : "border-steel/20 hover:border-steel/50 text-steel hover:text-foreground"
              }`}
            >
              All Materials
            </button>
            {families.map(fam => (
              <button
                key={fam.name}
                onClick={() => setActiveFamilyFilter(fam.name)}
                className={`font-sans text-xs uppercase tracking-wider px-3.5 py-2 rounded-sm border transition-colors ${
                  activeFamilyFilter === fam.name
                    ? "bg-orange border-orange text-white"
                    : "border-steel/20 hover:border-steel/50 text-steel hover:text-foreground"
                }`}
              >
                {fam.name}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[280px]">
            <Search className="w-4 h-4 text-steel absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search EN8, 4140, D2, equivalents..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full font-sans text-xs bg-graphite border border-steel/20 rounded-sm py-3 pl-10 pr-4 text-foreground focus:outline-none focus:border-orange transition-colors placeholder:text-steel/50"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-steel hover:text-foreground"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Graph Layout Desk */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Interactive Graph Box (Col-span 3) */}
          <div className="lg:col-span-3 bg-background border border-steel/10 rounded-sm relative aspect-[4/3] flex items-center justify-center overflow-hidden">
            {/* Background grid markings */}
            <div className="absolute inset-0 grid-bg opacity-40"></div>
            
            {/* Visual CAD guidelines lock status */}
            <div className="absolute top-4 left-4 font-mono text-[9px] text-steel/40">
              [VIEWPORT_GRID: 40X40MM • AUTO_SCALE: ON]
            </div>

            {/* SVG Visual Canvas for desktop/tablet */}
            <div className="hidden sm:block w-full h-full relative select-none">
              <svg 
                viewBox="0 0 800 600" 
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* 1. Links Rendering */}
                {graphData.links.map((link, idx) => {
                  const isActive = activeNodeIds.has(link.source) && activeNodeIds.has(link.target);
                  const isHighlighted = hoveredNodeId 
                    ? highlightedNodeIds.has(link.source) && highlightedNodeIds.has(link.target)
                    : false;

                  return (
                    <line
                      key={`link-${idx}`}
                      x1={link.sourceX}
                      y1={link.sourceY}
                      x2={link.targetX}
                      y2={link.targetY}
                      stroke={isHighlighted ? "var(--color-orange)" : "rgba(102, 113, 124, 0.15)"}
                      strokeWidth={isHighlighted ? 2.5 : isActive ? 1 : 0.2}
                      strokeDasharray={link.source === "root" ? "none" : "3,3"}
                      className="transition-all duration-300"
                    />
                  );
                })}

                {/* 2. Nodes Rendering */}
                {graphData.nodes.map((node) => {
                  const isActive = activeNodeIds.has(node.id);
                  const isHovered = hoveredNodeId === node.id;
                  const isHighlighted = hoveredNodeId ? highlightedNodeIds.has(node.id) : false;

                  return (
                    <g
                      key={node.id}
                      className="cursor-pointer"
                      onClick={() => {
                        if (node.details) {
                          setSelectedGrade(node.details);
                        }
                      }}
                      onMouseEnter={() => setHoveredNodeId(node.id)}
                      onMouseLeave={() => setHoveredNodeId(null)}
                    >
                      {/* Outer pulse effect for hovered/highlighted nodes */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={node.size + (isHighlighted || isHovered ? 8 : 4)}
                        fill={node.color}
                        opacity={isHovered ? 0.25 : isHighlighted ? 0.15 : 0.03}
                        className="transition-all duration-300"
                      />
                      
                      {/* Main Node Circle */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={node.size}
                        fill={isActive ? (node.type === "root" ? "var(--color-orange)" : "var(--color-graphite)") : "#151719"}
                        stroke={isActive ? (isHighlighted || isHovered ? "var(--color-orange)" : node.color) : "rgba(102, 113, 124, 0.2)"}
                        strokeWidth={isHighlighted || isHovered ? 2.5 : 1.5}
                        className="transition-all duration-300"
                      />

                      {/* Node Label Text */}
                      <text
                        x={node.x}
                        y={node.type === "root" ? node.y + 4 : node.y + (node.size + 15)}
                        textAnchor="middle"
                        fill={isActive ? (isHighlighted || isHovered ? "#FFFFFF" : "var(--color-foreground)") : "#66717C"}
                        fontSize={node.type === "root" ? "11px" : "10px"}
                        fontWeight={node.type === "root" ? "bold" : "medium"}
                        className="font-display tracking-wide pointer-events-none select-none transition-all duration-300"
                      >
                        {node.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Mobile Fallback: Horizontal Swipe Category Cards */}
            <div className="sm:hidden absolute inset-0 flex flex-col justify-end p-4 z-10 pointer-events-auto overflow-y-auto">
              <span className="font-mono text-[9px] text-steel/60 uppercase block mb-2">[SWIPE TO BROWSE FAMILIES]</span>
              <div className="flex space-x-3 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory">
                {materialCatalog.map((grade) => (
                  <div
                    key={grade.grade}
                    onClick={() => setSelectedGrade(grade)}
                    className="flex-shrink-0 w-64 bg-graphite border border-steel/15 p-4 rounded-sm snap-start select-none"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[10px] text-orange uppercase tracking-wider">{grade.family}</span>
                      <span className="font-sans text-[10px] bg-background border border-steel/10 px-1.5 py-0.5 text-steel rounded-sm">
                        {grade.status}
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-white mb-1">{grade.grade}</h3>
                    <p className="font-sans text-xs text-steel line-clamp-2 mb-3">
                      {grade.description}
                    </p>
                    <div className="flex justify-between items-center text-[11px] font-medium text-orange">
                      <span>View Specifications</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick List Reference Panel (Col-span 1) */}
          <div className="bg-background border border-steel/10 p-5 rounded-sm flex flex-col justify-between max-h-[600px] overflow-y-auto">
            <div>
              <span className="font-mono text-[10px] text-steel uppercase tracking-widest block mb-4 border-b border-steel/15 pb-2">
                Available Stock Grades
              </span>
              <div className="space-y-2">
                {materialCatalog
                  .filter(g => activeFamilyFilter === "All" || g.family === activeFamilyFilter)
                  .map(grade => (
                    <button
                      key={grade.grade}
                      onClick={() => setSelectedGrade(grade)}
                      className="w-full flex items-center justify-between p-2.5 rounded-sm hover:bg-graphite border border-transparent hover:border-steel/10 transition-all text-left group"
                    >
                      <div>
                        <span className="font-display text-sm font-bold text-foreground group-hover:text-orange transition-colors">
                          {grade.grade}
                        </span>
                        <span className="block font-sans text-[10px] text-steel mt-0.5">
                          AISI: {grade.equivalents.aisi || "N/A"}
                        </span>
                      </div>
                      <Info className="w-3.5 h-3.5 text-steel/50 group-hover:text-orange transition-colors" />
                    </button>
                  ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Side Slide Drawer for Grade Detail Specs */}
      <AnimatePresence>
        {selectedGrade && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex justify-end"
          >
            {/* Backdrop */}
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setSelectedGrade(null)}></div>

            {/* Slider Sheet */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-xl bg-graphite border-l border-steel/20 p-6 sm:p-8 shadow-2xl flex flex-col justify-between overflow-y-auto z-10"
            >
              <div>
                {/* Drawer Header */}
                <div className="flex items-start justify-between border-b border-steel/15 pb-4 mb-6">
                  <div>
                    <span className="font-mono text-xs text-orange uppercase tracking-wider block mb-1">
                      {selectedGrade.family}
                    </span>
                    <h3 className="font-display text-3xl font-black text-white">
                      {selectedGrade.grade}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedGrade(null)}
                    className="p-1 rounded-full hover:bg-background border border-steel/10 text-steel hover:text-foreground transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Grade Specifications Body */}
                <div className="space-y-6">
                  {/* Summary */}
                  <p className="font-sans text-sm text-steel leading-relaxed">
                    {selectedGrade.description}
                  </p>

                  {/* Equivalents Lookup Table */}
                  <div className="bg-background border border-steel/10 p-4 rounded-sm space-y-2">
                    <span className="font-mono text-[10px] text-steel uppercase tracking-widest block border-b border-steel/10 pb-1 mb-2">
                      International Standard Equivalents
                    </span>
                    <div className="grid grid-cols-2 gap-y-2 text-xs">
                      <div><span className="text-steel">AISI / ASTM:</span> <span className="font-medium text-foreground">{selectedGrade.equivalents.aisi || "—"}</span></div>
                      <div><span className="text-steel">DIN / EN:</span> <span className="font-medium text-foreground">{selectedGrade.equivalents.din || "—"}</span></div>
                      <div><span className="text-steel">BS:</span> <span className="font-medium text-foreground">{selectedGrade.equivalents.bs || "—"}</span></div>
                      <div><span className="text-steel">JIS:</span> <span className="font-medium text-foreground">{selectedGrade.equivalents.jis || "—"}</span></div>
                    </div>
                  </div>

                  {/* Available Forms & Conditions */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <span className="font-mono text-[10px] text-steel uppercase tracking-widest block border-b border-steel/15 pb-1">
                        Stocked Forms
                      </span>
                      <ul className="text-xs text-foreground/90 space-y-1">
                        {selectedGrade.forms.map(form => (
                          <li key={form} className="flex items-center space-x-1.5">
                            <span className="w-1.5 h-1.5 bg-orange rounded-full"></span>
                            <span>{form}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <span className="font-mono text-[10px] text-steel uppercase tracking-widest block border-b border-steel/15 pb-1">
                        Supply Condition
                      </span>
                      <ul className="text-xs text-foreground/90 space-y-1">
                        {selectedGrade.conditions.map(cond => (
                          <li key={cond} className="flex items-center space-x-1.5">
                            <span className="w-1.5 h-1.5 bg-blue rounded-full"></span>
                            <span>{cond}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Mechanical Properties */}
                  <div className="space-y-2">
                    <span className="font-mono text-[10px] text-steel uppercase tracking-widest block border-b border-steel/15 pb-1">
                      Mechanical Specifications
                    </span>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="bg-background border border-steel/10 p-2 rounded-sm">
                        <span className="block text-[10px] text-steel">Tensile (Min)</span>
                        <span className="font-display font-bold text-foreground">
                          {selectedGrade.mechanicalProperties.tensileStrengthMin ? `${selectedGrade.mechanicalProperties.tensileStrengthMin} MPa` : "—"}
                        </span>
                      </div>
                      <div className="bg-background border border-steel/10 p-2 rounded-sm">
                        <span className="block text-[10px] text-steel">Yield (Min)</span>
                        <span className="font-display font-bold text-foreground">
                          {selectedGrade.mechanicalProperties.yieldStrengthMin ? `${selectedGrade.mechanicalProperties.yieldStrengthMin} MPa` : "—"}
                        </span>
                      </div>
                      <div className="bg-background border border-steel/10 p-2 rounded-sm">
                        <span className="block text-[10px] text-steel">Hardness (Max)</span>
                        <span className="font-display font-bold text-foreground">
                          {selectedGrade.mechanicalProperties.hardnessMax || "—"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Typical Applications */}
                  <div className="space-y-2">
                    <span className="font-mono text-[10px] text-steel uppercase tracking-widest block border-b border-steel/15 pb-1">
                      Industrial Applications
                    </span>
                    <ul className="text-xs text-steel space-y-1.5">
                      {selectedGrade.applications.map((app, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="text-orange mt-0.5">▪</span>
                          <span className="text-foreground/90">{app}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </div>

              {/* Slider Bottom Actions */}
              <div className="border-t border-steel/15 pt-6 mt-8 space-y-3">
                <Link
                  href={`/contact?grade=${encodeURIComponent(selectedGrade.grade)}`}
                  onClick={() => setSelectedGrade(null)}
                  className="font-sans text-xs font-bold uppercase tracking-wider bg-orange hover:bg-orange/90 text-white w-full py-3.5 rounded-sm transition-all duration-200 flex items-center justify-center space-x-2 shadow-md shadow-orange/10 hover:shadow-orange/20"
                >
                  <span>Request Quote For {selectedGrade.grade}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                
                <Link
                  href={`/materials/${encodeURIComponent(selectedGrade.grade)}`}
                  onClick={() => setSelectedGrade(null)}
                  className="font-sans text-xs font-semibold uppercase tracking-wider border border-steel/20 hover:border-steel/50 hover:bg-background text-foreground w-full py-3.5 rounded-sm transition-all duration-200 flex items-center justify-center"
                >
                  View Complete Datasheet Details
                </Link>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
