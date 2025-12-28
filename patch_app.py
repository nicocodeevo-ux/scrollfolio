
import os
import re

file_path = r'c:/Users/Nick de Nitro/Desktop/scrollfolio/App.tsx'

new_content = r'''        <Section id="experience" title="Professional Timeline">
          <div className="flex flex-col gap-6 max-w-5xl mx-auto">
            {/* Experience Item 1 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="group p-8 md:p-10 apple-glass brushed-metal rounded-[2.5rem] border border-white/5 hover:border-[#ff7a22]/30 transition-all"
            >
               <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="w-full md:w-1/3 space-y-2 md:text-right border-l-2 md:border-l-0 md:border-r-2 border-[#ff7a22]/30 pl-4 md:pl-0 md:pr-6">
                     <h3 className="text-2xl font-bold tracking-tight text-white">Python Backend Dev</h3>
                     <div className="text-[#ff7a22] font-mono text-xs tracking-wider uppercase font-bold">03/2025 — Present</div>
                     <p className="text-white/40 text-sm font-mono flex items-center md:justify-end gap-2">
                       DCI Berlin
                       <svg className="w-4 h-4 text-[#ff7a22]" fill="currentColor" viewBox="0 0 20 20"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-2.75-.174l-.154.018a5.5 5.5 0 01-1.458-5.148l.154.018a1.166 1.166 0 01.972.651zM9.25 11.83l2 1.143v4.102a8.969 8.969 0 00-2.75-.174l-.154.018a5.5 5.5 0 01-1.458-5.148l.154.018a1.166 1.166 0 01.972.651z" /></svg>
                     </p>
                  </div>
                  <div className="w-full md:w-2/3">
                     <p className="text-white/70 font-light text-base leading-relaxed">
                       Immersive specialization in architecture design, data flow optimization, and secure API engineering using the Python ecosystem.
                     </p>
                  </div>
               </div>
            </motion.div>

            {/* Experience Item 2 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="group p-8 md:p-10 apple-glass brushed-metal rounded-[2.5rem] border border-white/5 hover:border-[#ff7a22]/30 transition-all"
            >
               <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="w-full md:w-1/3 space-y-2 md:text-right border-l-2 md:border-l-0 md:border-r-2 border-white/5 pl-4 md:pl-0 md:pr-6 group-hover:border-[#ff7a22]/30 transition-colors">
                     <h3 className="text-xl font-bold tracking-tight text-white/80">Site Manager</h3>
                     <div className="text-white/30 font-mono text-xs tracking-wider uppercase">2016 — 2017</div>
                     <p className="text-white/40 text-sm font-mono">Security Operations</p>
                  </div>
                  <div className="w-full md:w-2/3">
                     <p className="text-white/60 font-light text-base leading-relaxed">
                       Command and control of operational protocols at high-sensitivity facilities. Expert in reliability and structured documentation.
                     </p>
                  </div>
               </div>
            </motion.div>

            {/* Experience Item 3 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="group p-8 md:p-10 apple-glass brushed-metal rounded-[2.5rem] border border-white/5 hover:border-[#ff7a22]/30 transition-all"
            >
               <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="w-full md:w-1/3 space-y-2 md:text-right border-l-2 md:border-l-0 md:border-r-2 border-white/5 pl-4 md:pl-0 md:pr-6 group-hover:border-[#ff7a22]/30 transition-colors">
                     <h3 className="text-xl font-bold tracking-tight text-white/80">Security Specialist</h3>
                     <div className="text-white/30 font-mono text-xs tracking-wider uppercase">2011 — 2016</div>
                     <p className="text-white/40 text-sm font-mono">High-Sensitivity Sector</p>
                  </div>
                  <div className="w-full md:w-2/3">
                     <p className="text-white/60 font-light text-base leading-relaxed">
                       Rigorous adherence to military-grade safety organizational systems and administrative monitoring.
                     </p>
                  </div>
               </div>
            </motion.div>
          </div>
        </Section>'''

# Read content
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern to find the experience section
# We look for <Section id="experience" ...> ... </Section>
# We need to be careful about not consuming the next section if it exists, or matching too little.
# Since we know the next section is "contact", we can use that as a stopper or just match nested? 
# Regex for nested tags is hard. But we know the indentation structure.
# Let's try to match from <Section id="experience" to the line before <Section id="contact"
# Or just use the exact previous content I know is there?
# Actually, I can just find the start Index and the End index.

start_marker = '<Section id="experience" title="Professional Timeline">'
end_marker = '<Section id="contact" title="System Protocol">'

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx == -1 or end_idx == -1:
    print("Could not find markers")
    exit(1)

# We want to keep the end marker, but replace everything before it up to start marker.
# But wait, there is whitespace before end_marker usually?
# Let's look at the file.
# 229:         </Section>
# 230: 
# 231:         <Section id="contact" title="System Protocol">

# So we want to replace from start_marker up to (but not including) end_marker.
# AND we need to leave the </Section> of the previous section?
# No, new_content includes <Section id="experience" ...> </Section> at the end.
# So we should find the closing </Section> of the experience block?
# Finding by next section start is safer.

replacement_range_content = content[start_idx:end_idx]
# We need to replace this block with new_content + some newlines maybe?
# new_content ends with </Section>.
# We should ensure we preserve the spacing between sections.

updated_content = content[:start_idx] + new_content + "\n\n        " + content[end_idx:]

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(updated_content)

print("Successfully patched App.tsx")
