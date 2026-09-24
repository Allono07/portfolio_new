import useReducedMotion from '../../hooks/useReducedMotion.js';
export default function MagneticLink({ children, ...props }) {
  const reduced=useReducedMotion();
  return <a {...props} onPointerMove={event=>{
    if(reduced||event.pointerType!=='mouse')return;
    const box=event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.transform=`translate(${(event.clientX-box.left-box.width/2)*.055}px,${(event.clientY-box.top-box.height/2)*.08}px)`;
  }} onPointerLeave={event=>{event.currentTarget.style.transform='';}}>{children}</a>;
}
