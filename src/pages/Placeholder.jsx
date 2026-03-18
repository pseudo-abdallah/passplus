
import { Link } from "react-router-dom";
export default function Placeholder({ title }) {
  return (
    <div style={{ minHeight:'100vh', background:'#000', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', color:'#fff' }}>
      <h1 style={{ fontSize:64, marginBottom:12 }}>{title.toUpperCase()}</h1>
      <p style={{ color:'rgba(255,255,255,0.4)', marginBottom:32 }}>Coming Soon.</p>
      <Link to="/" style={{ padding:'12px 24px', background:'rgba(255,255,255,0.1)', color:'#fff', borderRadius:99, textDecoration:'none' }}>Back Home</Link>
    </div>
  );
}
