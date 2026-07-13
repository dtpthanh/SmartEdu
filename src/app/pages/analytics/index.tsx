import { useState } from "react";
import {
  ChevronDown, Maximize2, ArrowRight, ArrowUpRight, ArrowDownRight,
  Users, UserCheck, Clock, HandMetal, AlertTriangle, Volume2,
  MessageCircle, UserX, Activity, Lightbulb, Brain,
  CalendarDays, School, Info,
} from "lucide-react";

// ── Color map ─────────────────────────────────────────────────────────────────
const COLORS: Record<string, string> = {
  "bg-blue-50":   "#4285F4",
  "bg-green-50":  "#34A853",
  "bg-orange-50": "#F29900",
  "bg-red-50":    "#EA4335",
  "bg-yellow-50": "#FBBC05",
  "bg-amber-50":  "#FBBC05",
  "bg-purple-50": "#8b5cf6",
  "bg-indigo-50": "#4285F4",
  "bg-teal-50":   "#34A853",
  "bg-gray-100":  "#4b5563",
};

// ── Data ──────────────────────────────────────────────────────────────────────
const ATT_DATA = [
  { h:"07:00",v:65 },{ h:"08:00",v:78 },{ h:"09:00",v:72 },{ h:"10:00",v:82 },
  { h:"11:00",v:85 },{ h:"12:00",v:45 },{ h:"13:00",v:55 },{ h:"14:00",v:78 },
  { h:"15:00",v:80 },{ h:"16:00",v:70 },{ h:"17:00",v:60 },
];
const NOISE_DATA = [
  { h:"07:00",v:35 },{ h:"08:00",v:45 },{ h:"09:00",v:55 },{ h:"10:00",v:72 },
  { h:"11:00",v:65 },{ h:"12:00",v:40 },{ h:"13:00",v:45 },{ h:"14:00",v:55 },
  { h:"15:00",v:58 },{ h:"16:00",v:48 },{ h:"17:00",v:38 },
];
// 0=not detected, 1=poor(red), 2=medium(orange), 3=good(green)
const HEATMAP = [
  [3,3,3,3,2,3],[3,3,2,3,3,3],[2,3,3,2,3,1],
  [3,2,1,3,2,3],[3,3,2,3,1,2],[2,3,3,0,3,2],
];
const EVENTS = [
  { time:"08:31", icon:<HandMetal size={14}/>,  bg:"bg-green-100",  color:"text-green-600",  title:"Học sinh giơ tay phát biểu", sub:"2 học sinh",         img:"https://images.unsplash.com/photo-1509062522246-3755977927d7?w=80&q=60" },
  { time:"08:44", icon:<MessageCircle size={14}/>, bg:"bg-orange-100",color:"text-orange-500",title:"Nói chuyện riêng",           sub:"Nhóm bàn 4 - 2 học sinh", img:"https://images.unsplash.com/photo-1577896851231-70ef18881754?w=80&q=60" },
  { time:"08:55", icon:<Volume2 size={14}/>,    bg:"bg-red-100",    color:"text-red-500",    title:"Mức độ ồn cao",               sub:"Âm lượng: 72 dB",    img:"https://images.unsplash.com/photo-1588075592405-d3d4f0846961?w=80&q=60" },
  { time:"09:12", icon:<UserX size={14}/>,      bg:"bg-yellow-100", color:"text-yellow-600", title:"Học sinh rời chỗ",             sub:"1 học sinh",         img:"https://images.unsplash.com/photo-1636202339022-7d67f7447e3a?w=80&q=60" },
  { time:"09:21", icon:<Users size={14}/>,      bg:"bg-blue-100",   color:"text-blue-600",   title:"Hoạt động nhóm",              sub:"Nhóm bàn 2 - 5 học sinh", img:"https://images.unsplash.com/photo-1561089489-f13d5e730d72?w=80&q=60" },
];
const BEHAVIOR = [
  { label:"Tập trung tốt",       val:45, pct:48.9, color:"#34A853" },
  { label:"Nói chuyện riêng",    val:18, pct:19.6, color:"#FBBC05" },
  { label:"Rời chỗ / Di chuyển", val:10, pct:10.9, color:"#eab308" },
  { label:"Giơ tay phát biểu",   val:12, pct:13.0, color:"#4285F4" },
  { label:"Khác",                val:7,  pct:7.6,  color:"#94a3b8" },
];
const TOP_STUDENTS = [
  { name:"Trần Minh Đức",      pct:95, trend:10, up:true  },
  { name:"Lê Hoàng Nam",       pct:90, trend:6,  up:true  },
  { name:"Nguyễn Khánh Linh",  pct:88, trend:5,  up:true  },
  { name:"Phạm Gia Bảo",       pct:82, trend:3,  up:true  },
  { name:"Đỗ Thanh Tùng",      pct:76, trend:2,  up:false },
  { name:"...",                 pct:0,  trend:0,  up:true  },
  { name:"Nguyễn Văn An",      pct:45, trend:8,  up:false },
];
const SUGGESTIONS = [
  { icon:<Users size={18}/>,      bg:"bg-blue-100",   color:"text-blue-600",  title:"Tăng cường tương tác",      desc:"Khuyến khích đặt câu hỏi, thảo luận để duy trì sự tập trung." },
  { icon:<Volume2 size={18}/>,    bg:"bg-orange-100", color:"text-orange-500", title:"Kiểm soát âm lượng lớp",   desc:"Giảm tiếng ồn để tạo môi trường học tập tốt hơn." },
  { icon:<MessageCircle size={18}/>, bg:"bg-yellow-100",color:"text-yellow-600",title:"Quan tâm nhóm học sinh", desc:"Nhóm bàn 4 có dấu hiệu nói chuyện riêng nhiều." },
  { icon:<HandMetal size={18}/>,  bg:"bg-green-100",  color:"text-green-600",  title:"Phát huy học sinh tích cực", desc:"Tạo cơ hội cho học sinh giơ tay phát biểu." },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
const hmColor = (v:number) => v===3?"#34A853":v===2?"#FBBC05":v===1?"#ef4444":"#e2e8f0";

// ── Attention line chart ──────────────────────────────────────────────────────
function AttentionChart() {
  const W=420; const H=160; const pad={l:32,r:12,t:28,b:28};
  const cW=W-pad.l-pad.r; const cH=H-pad.t-pad.b;
  const xs=ATT_DATA.map((_,i)=>pad.l+(i/(ATT_DATA.length-1))*cW);
  const ys=ATT_DATA.map(d=>pad.t+(1-d.v/100)*cH);
  const pts=xs.map((x,i)=>`${x},${ys[i]}`).join(" ");
  const area=`${xs[0]},${H-pad.b} `+pts+` ${xs[xs.length-1]},${H-pad.b}`;
  const peakIdx=ATT_DATA.findIndex(d=>d.v===Math.max(...ATT_DATA.map(d=>d.v)));

  const zones=[
    {y:pad.t+(0)*cH,     h:(1-0.8)*cH,   fill:"#dcfce7"},
    {y:pad.t+(0.2)*cH,   h:(0.3)*cH,     fill:"#fef9c3"},
    {y:pad.t+(0.5)*cH,   h:(0.5)*cH,     fill:"#fee2e2"},
  ];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{height:160}}>
      <defs>
        <linearGradient id="att2-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4285F4" stopOpacity="0.15"/>
          <stop offset="100%" stopColor="#4285F4" stopOpacity="0"/>
        </linearGradient>
      </defs>
      {/* Zone backgrounds */}
      {zones.map((z,i)=><rect key={i} x={pad.l} y={z.y} width={cW} height={z.h} fill={z.fill} opacity={0.4}/>)}
      {/* Gridlines */}
      {[0,25,50,75,100].map(v=>{
        const y=pad.t+(1-v/100)*cH;
        return <g key={v}><line x1={pad.l} y1={y} x2={W-pad.r} y2={y} stroke="#e2e8f0" strokeWidth={1}/><text x={pad.l-4} y={y+3} textAnchor="end" fontSize={8} fill="#94a3b8">{v}%</text></g>;
      })}
      <polygon points={area} fill="url(#att2-grad)"/>
      <polyline points={pts} fill="none" stroke="#4285F4" strokeWidth={2} strokeLinejoin="round"/>
      {xs.map((x,i)=>(
        <circle key={i} cx={x} cy={ys[i]} r={i===peakIdx?4:2.5}
          fill={i===peakIdx?"#4285F4":"white"} stroke="#4285F4" strokeWidth={1.5}/>
      ))}
      {/* Peak label */}
      <rect x={xs[peakIdx]-30} y={ys[peakIdx]-26} width={60} height={18} rx={4} fill="#1A73E8"/>
      <text x={xs[peakIdx]} y={ys[peakIdx]-14} textAnchor="middle" fontSize={8} fill="white" fontWeight="bold">
        {ATT_DATA[peakIdx].h} / {ATT_DATA[peakIdx].v}%
      </text>
      {ATT_DATA.map((d,i)=>(
        <text key={i} x={xs[i]} y={H-6} textAnchor="middle" fontSize={8} fill="#94a3b8">{d.h}</text>
      ))}
    </svg>
  );
}

// ── Noise chart ───────────────────────────────────────────────────────────────
function NoiseChart() {
  const W=360; const H=140; const pad={l:36,r:12,t:24,b:28};
  const cW=W-pad.l-pad.r; const cH=H-pad.t-pad.b;
  const maxV=120;
  const xs=NOISE_DATA.map((_,i)=>pad.l+(i/(NOISE_DATA.length-1))*cW);
  const ys=NOISE_DATA.map(d=>pad.t+(1-d.v/maxV)*cH);
  const pts=xs.map((x,i)=>`${x},${ys[i]}`).join(" ");
  const thresholdY=pad.t+(1-60/maxV)*cH;
  const area=`${xs[0]},${H-pad.b} `+pts+` ${xs[xs.length-1]},${H-pad.b}`;
  const peakIdx=NOISE_DATA.findIndex(d=>d.v===Math.max(...NOISE_DATA.map(d=>d.v)));
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{height:140}}>
      <defs>
        <linearGradient id="noise-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4285F4" stopOpacity="0.12"/>
          <stop offset="100%" stopColor="#4285F4" stopOpacity="0"/>
        </linearGradient>
      </defs>
      {[0,30,60,90,120].map(v=>{
        const y=pad.t+(1-v/maxV)*cH;
        return <g key={v}><line x1={pad.l} y1={y} x2={W-pad.r} y2={y} stroke="#f1f5f9" strokeWidth={1}/><text x={pad.l-4} y={y+3} textAnchor="end" fontSize={8} fill="#94a3b8">{v}</text></g>;
      })}
      {/* Threshold dashed */}
      <line x1={pad.l} y1={thresholdY} x2={W-pad.r} y2={thresholdY} stroke="#ef4444" strokeWidth={1.5} strokeDasharray="4,3"/>
      <polygon points={area} fill="url(#noise-grad)"/>
      <polyline points={pts} fill="none" stroke="#4285F4" strokeWidth={2} strokeLinejoin="round"/>
      {xs.map((x,i)=>(
        <circle key={i} cx={x} cy={ys[i]} r={i===peakIdx?4:2.5}
          fill={i===peakIdx?"#4285F4":"white"} stroke="#4285F4" strokeWidth={1.5}/>
      ))}
      {/* Peak label */}
      <rect x={xs[peakIdx]-28} y={ys[peakIdx]-24} width={56} height={16} rx={3} fill="#1A73E8"/>
      <text x={xs[peakIdx]} y={ys[peakIdx]-13} textAnchor="middle" fontSize={8} fill="white" fontWeight="bold">
        {NOISE_DATA[peakIdx].h} / {NOISE_DATA[peakIdx].v} dB
      </text>
      {NOISE_DATA.map((d,i)=>(
        <text key={i} x={xs[i]} y={H-6} textAnchor="middle" fontSize={7.5} fill="#94a3b8">{d.h}</text>
      ))}
    </svg>
  );
}

// ── Behavior donut ────────────────────────────────────────────────────────────
function BehaviorDonut() {
  const total=92; const r=58; const cx=70; const cy=70;
  let angle=-Math.PI/2;
  const paths=BEHAVIOR.map(s=>{
    const sweep=(s.val/total)*2*Math.PI;
    const x1=cx+r*Math.cos(angle); const y1=cy+r*Math.sin(angle);
    angle+=sweep;
    const x2=cx+r*Math.cos(angle); const y2=cy+r*Math.sin(angle);
    const large=sweep>Math.PI?1:0;
    const inn=34;
    const ix1=cx+inn*Math.cos(angle-sweep); const iy1=cy+inn*Math.sin(angle-sweep);
    const ix2=cx+inn*Math.cos(angle); const iy2=cy+inn*Math.sin(angle);
    return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} L ${ix2} ${iy2} A ${inn} ${inn} 0 ${large} 0 ${ix1} ${iy1} Z`;
  });
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex-shrink-0">
        <svg width={140} height={140} viewBox="0 0 140 140">
          {paths.map((d,i)=><path key={i} d={d} fill={BEHAVIOR[i].color}/>)}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="text-xl font-bold text-gray-800">{total}</div>
          <div className="text-[9px] text-gray-400 text-center leading-tight">Tổng sự<br/>kiện</div>
        </div>
      </div>
      <div className="space-y-1.5 flex-1">
        {BEHAVIOR.map(b=>(
          <div key={b.label} className="flex items-center justify-between text-[11px]">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{backgroundColor:b.color}}/>
              <span className="text-gray-600">{b.label}</span>
            </span>
            <span className="font-semibold text-gray-700 ml-2">{b.val} <span className="text-gray-400 font-normal">({b.pct}%)</span></span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Heatmap ───────────────────────────────────────────────────────────────────
function Heatmap() {
  return (
    <div>
      {/* Teacher front */}
      <div className="flex justify-center mb-2">
        <div className="px-6 py-1 bg-gray-100 rounded text-[10px] text-gray-500 font-medium">Bảng + Giáo viên</div>
      </div>
      <div className="grid gap-2" style={{gridTemplateColumns:"repeat(6,1fr)"}}>
        {HEATMAP.flat().map((v,i)=>(
          <div key={i} className="flex items-center justify-center">
            <div className="w-7 h-7 rounded-full border-2 border-white shadow-sm flex items-center justify-center"
              style={{backgroundColor:hmColor(v)}}>
              {v>0&&<span className="text-white text-[8px] font-bold">{i+1}</span>}
            </div>
          </div>
        ))}
      </div>
      {/* Legend */}
      <div className="flex items-center gap-3 mt-3 justify-center text-[10px] text-gray-500">
        {[["#34A853","Tốt"],["#FBBC05","TB"],["#ef4444","Kém"],["#e2e8f0","N/A"]].map(([c,l])=>(
          <span key={l} className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full inline-block" style={{backgroundColor:c}}/>
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ══════════════════════════════════════════════════════════════════════════════
export default function AnalyticsPage() {
  const stats = [
    { icon:<Activity size={18}/>,    bg:"bg-blue-50",   color:"text-blue-500",   label:"Mức độ tập trung TB",  val:"82%",    sub:null,    badge:null,          trend:"+12%", trendSub:"So với hôm qua" },
    { icon:<Volume2 size={18}/>,     bg:"bg-orange-50", color:"text-orange-500", label:"Mức độ ồn trung bình", val:"45 dB",  sub:"Ngưỡng: < 60 dB", badge:"Trung bình", trend:null, trendSub:null },
    { icon:<Clock size={18}/>,       bg:"bg-teal-50",   color:"text-teal-500",   label:"Thời gian GV giảng",   val:"68%",    sub:"41 phát · Tổng thời gian lớp học", badge:null, trend:null, trendSub:null },
    { icon:<HandMetal size={18}/>,   bg:"bg-purple-50", color:"text-purple-500", label:"Học sinh giơ tay",     val:"12",     sub:"Tổng số lần", badge:null, trend:null, trendSub:null },
    { icon:<AlertTriangle size={18}/>, bg:"bg-red-50", color:"text-red-500",     label:"Sự kiện cảnh báo",     val:"6",      sub:"Tổng số sự kiện", badge:null, trend:null, trendSub:null },
  ];

  return (
    <div className="app-page">
      {/* Sub-filter bar */}
      <div className="app-toolbar mb-4 flex flex-wrap items-center gap-3 px-4 py-3">
        <div className="flex flex-col gap-0.5">
          <div className="text-[10px] text-gray-400">Phòng học</div>
          <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-[12px] text-gray-700 hover:bg-gray-50">
            A101 - Lớp 10A1 <ChevronDown size={11} className="text-gray-400"/>
          </button>
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="text-[10px] text-gray-400">Thời gian</div>
          <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-[12px] text-gray-700 hover:bg-gray-50">
            Hôm nay <ChevronDown size={11} className="text-gray-400"/>
          </button>
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="text-[10px] text-gray-400">Ngày</div>
          <div className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-[12px] text-gray-700 bg-white">
            <CalendarDays size={13} className="text-gray-400"/>29/04/2026
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="app-grid-stats mb-4">
        {stats.map(s=>(
          <div key={s.label} className="rounded-xl px-4 py-3 flex items-center gap-3 shadow-sm" style={{ backgroundColor: COLORS[s.bg] ?? "#4285F4" }}>
            <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <span className="text-white">{s.icon}</span>
            </div>
            <div className="min-w-0">
              <div className="text-[10px] text-white/70 uppercase tracking-wide mb-0.5 truncate">{s.label}</div>
              <div className="text-xl font-bold text-white leading-none flex items-center gap-1.5">
                {s.val}
                {s.badge && <span className="text-[10px] bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded font-semibold">{s.badge}</span>}
              </div>
              {s.trend && <div className="flex items-center gap-0.5 text-white/70 text-[11px] font-medium mt-0.5"><ArrowUpRight size={11}/>{s.trend} {s.trendSub}</div>}
              {s.sub && <div className="text-[10px] text-white/70 mt-0.5 truncate">{s.sub}</div>}
            </div>
          </div>
        ))}
      </div>

      {/* Row 1: 4 sections */}
      <div className="mb-4 grid grid-cols-1 gap-4 xl:grid-cols-[180px_minmax(0,1fr)] 2xl:grid-cols-[180px_minmax(0,1fr)_220px_230px]">
        {/* Room info */}
        <div className="app-surface w-full overflow-hidden">
          <div className="text-[12px] font-bold text-gray-800 px-3 pt-3 pb-2 border-b border-gray-50">Thông tin phòng học</div>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=300&q=65" alt="room" className="w-full h-[110px] object-cover"/>
            <span className="absolute top-2 right-2 text-[10px] bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full">Đang học</span>
          </div>
          <div className="p-3 space-y-1.5">
            <div className="font-bold text-[13px] text-gray-800">A101 - Lớp 10A1</div>
            <div className="flex items-center gap-1.5 text-[11px] text-gray-500"><Users size={11}/> 38/40 học sinh</div>
            <div className="flex items-center gap-1.5 text-[11px] text-gray-500"><UserCheck size={11}/> Giáo viên: Nguyễn Văn A</div>
            <div className="flex items-center gap-1.5 text-[11px] text-gray-500"><Clock size={11}/> Thời gian: 08:00 - 09:30</div>
            <button className="flex items-center gap-1 text-[11px] text-blue-500 hover:underline mt-1">
              Xem chi tiết phòng học <ArrowRight size={11}/>
            </button>
          </div>
        </div>

        {/* Attention chart */}
        <div className="flex-1 min-w-0 app-surface p-3">
          <div className="flex items-center justify-between mb-1">
            <div className="text-[12px] font-bold text-gray-800">Mức độ tập trung theo thời gian</div>
            <button className="flex items-center gap-1 border border-gray-200 rounded px-2 py-1 text-[11px] text-gray-600 hover:bg-gray-50">
              Theo giờ <ChevronDown size={10} className="text-gray-400"/>
            </button>
          </div>
          <AttentionChart/>
          <div className="flex items-center gap-3 mt-1.5 text-[10px] text-gray-500">
            {[["#34A853","Tốt (80–100%)"],["#FBBC05","Trung bình (50–79%)"],["#ef4444","Kém (<50%)"],["#d1d5db","Không phát hiện"]].map(([c,l])=>(
              <span key={l} className="flex items-center gap-1"><span className="w-2 h-2 rounded-full inline-block" style={{backgroundColor:c}}/>{l}</span>
            ))}
          </div>
        </div>

        {/* Heatmap */}
        <div className="app-surface w-full p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="text-[12px] font-bold text-gray-800">Heatmap tập trung</div>
            <button className="app-icon-btn h-7 w-7 rounded-lg"><Maximize2 size={13}/></button>
          </div>
          <Heatmap/>
        </div>

        {/* Events */}
        <div className="app-surface w-full p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="text-[12px] font-bold text-gray-800">Sự kiện nổi bật</div>
            <button className="text-[11px] text-blue-500 hover:underline">Xem tất cả</button>
          </div>
          <div className="space-y-2.5">
            {EVENTS.map((e,i)=>(
              <div key={i} className="flex items-start gap-2">
                <div className={`app-icon-badge rounded-full ${e.bg} ${e.color} flex-shrink-0 mt-0.5`}>{e.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[11px] font-medium text-gray-800 truncate">{e.title}</span>
                    <span className="text-[10px] text-gray-400 font-mono flex-shrink-0">{e.time}</span>
                  </div>
                  <div className="text-[10px] text-gray-400">{e.sub}</div>
                </div>
                <img src={e.img} alt="" className="w-9 h-7 object-cover rounded flex-shrink-0"/>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: 3 sections */}
      <div className="mb-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
        {/* Behavior donut */}
        <div className="app-surface p-4">
          <div className="text-[12px] font-bold text-gray-800 mb-3">Phân tích hành vi theo danh mục</div>
          <BehaviorDonut/>
        </div>

        {/* Student top 10 */}
        <div className="app-surface p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-[12px] font-bold text-gray-800">Mức độ tập trung theo học sinh (Top 10)</div>
            <button className="flex items-center gap-1 border border-gray-200 rounded px-2 py-1 text-[11px] text-gray-600 hover:bg-gray-50">
              Tất cả học sinh <ChevronDown size={10} className="text-gray-400"/>
            </button>
          </div>
          <table className="w-full text-[11px]">
            <thead>
              <tr className="border-b border-gray-900/15">
                <th className="text-left py-1.5 text-gray-400 font-semibold w-5">#</th>
                <th className="text-left py-1.5 text-gray-400 font-semibold">Học sinh</th>
                <th className="py-1.5 text-gray-400 font-semibold text-center">Mức độ tập trung</th>
                <th className="py-1.5 text-gray-400 font-semibold text-center">Xu hướng</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {TOP_STUDENTS.map((s,i)=>(
                s.name==="..."
                  ? <tr key={i}><td colSpan={4} className="text-center py-1 text-gray-300 text-[10px]">...</td></tr>
                  : <tr key={i} className="hover:bg-gray-50">
                      <td className="py-1.5 text-gray-400">{i<5?i+1:10}</td>
                      <td className="py-1.5 font-medium text-gray-700">{s.name}</td>
                      <td className="py-1.5 px-2">
                        <div className="flex items-center gap-1.5">
                          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${s.pct>=80?"bg-green-500":s.pct>=50?"bg-yellow-400":"bg-red-500"}`}
                              style={{width:`${s.pct}%`}}/>
                          </div>
                          <span className="font-semibold text-gray-700 w-7 text-right">{s.pct}%</span>
                        </div>
                      </td>
                      <td className="py-1.5 text-center">
                        <span className={`flex items-center justify-center gap-0.5 font-medium ${s.up?"text-green-600":"text-red-500"}`}>
                          {s.up?<ArrowUpRight size={11}/>:<ArrowDownRight size={11}/>}{s.trend}%
                        </span>
                      </td>
                    </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Noise chart */}
        <div className="app-surface p-4">
          <div className="flex items-center justify-between mb-1">
            <div className="text-[12px] font-bold text-gray-800">Biểu đồ mức độ ồn</div>
            <button className="flex items-center gap-1 border border-gray-200 rounded px-2 py-1 text-[11px] text-gray-600 hover:bg-gray-50">
              Theo giờ <ChevronDown size={10} className="text-gray-400"/>
            </button>
          </div>
          <NoiseChart/>
          <div className="flex items-center gap-4 mt-1 text-[10px] text-gray-500">
            <span className="flex items-center gap-1.5"><span className="w-5 h-0.5 bg-blue-500 inline-block rounded"/><span>Mức độ ồn (dB)</span></span>
            <span className="flex items-center gap-1.5"><span className="w-5 inline-block border-t-2 border-red-400 border-dashed"/><span>Ngưỡng cao (60 dB)</span></span>
          </div>
        </div>
      </div>

      {/* Row 3: AI insights */}
      <div className="grid grid-cols-2 gap-4">
        {/* AI assessment */}
        <div className="app-surface p-4">
          <div className="flex items-start gap-3">
            <div className="app-icon-tile h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600">
              <Brain size={20} className="text-blue-600"/>
            </div>
            <div className="flex-1">
              <div className="text-[12px] font-bold text-gray-800 mb-2">Nhận định của AI</div>
              <p className="text-[12px] text-gray-600 leading-relaxed">
                AI nhận thấy mức độ tập trung của lớp ở mức tốt trong phần đầu buổi học.
                Tuy nhiên, có sự giảm nhẹ vào thời điểm 11:00–12:00 khi mức ồn tăng cao.
                Nên tăng cường tương tác và kiểm soát âm lượng để duy trì sự tập trung.
              </p>
              <button className="flex items-center gap-1.5 text-[12px] text-blue-500 hover:underline mt-2">
                Xem chi tiết phân tích <ArrowRight size={12}/>
              </button>
            </div>
          </div>
        </div>

        {/* Suggestions */}
        <div className="app-surface p-4">
          <div className="text-[12px] font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Lightbulb size={15} className="text-yellow-500"/> Gợi ý cải thiện
          </div>
          <div className="grid grid-cols-2 gap-3">
            {SUGGESTIONS.map(s=>(
              <div key={s.title} className="flex items-start gap-2.5 p-2.5 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                <div className={`app-icon-tile ${s.bg} ${s.color} flex-shrink-0`}>{s.icon}</div>
                <div>
                  <div className="text-[11px] font-semibold text-gray-800">{s.title}</div>
                  <div className="text-[10px] text-gray-500 mt-0.5 leading-tight">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}




