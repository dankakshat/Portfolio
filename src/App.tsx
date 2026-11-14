import { NexusScene } from './Scene'
import { useNexusStore, type Location } from './store'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const nav: { id: Location; label: string }[] = [
  { id: 'identity', label: 'Identity' }, { id: 'archives', label: 'Projects' }, { id: 'skills', label: 'Skills' }, { id: 'chronicles', label: 'Experience' }, { id: 'laboratory', label: 'Laboratory' }, { id: 'contact', label: 'Contact' },
]

export function App() {
  const { location, quality, setLocation, cycleQuality } = useNexusStore()
  const locationRef = useRef<HTMLElement>(null)
  useEffect(() => { if (locationRef.current) gsap.fromTo(locationRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .5, ease: 'power2.out' }) }, [location])
  return <main>
    <div className="scene"><NexusScene /></div>
    <header><span className="sigil">✦</span><div><p>NEXUS — THE DIVINE ARCHIVE</p><small>ENTER THE UNKNOWN</small></div><button className="quality" onClick={cycleQuality} aria-label="Change visual quality">{quality}</button></header>
    <section ref={locationRef} className={`location ${location === 'home' ? '' : 'visible'}`} aria-live="polite">
      {location === 'home' ? <><p className="eyebrow">01 / THE ATRIUM</p><h1>THE DIVINE<br/><i>ARCHIVE</i></h1><p className="instruction">Drag the sculpture to orbit · Select a celestial artifact to enter</p></> : <><button onClick={() => setLocation('home')}>← Return to atrium</button><p className="eyebrow">LOCATION / {location}</p><h1>{nav.find((item) => item.id === location)?.label}</h1><p className="instruction">This chamber is prepared for your real portfolio material.</p></>}
    </section>
    <nav aria-label="Archive locations"><span className="nav-title">LOCATIONS</span>{nav.map((item) => <button className={location === item.id ? 'active' : ''} key={item.id} onClick={() => setLocation(item.id)}>{item.label}</button>)}</nav>
  </main>
}
