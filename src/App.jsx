import React, { useState } from "react";
import { 
  Menu, X, MapPin, Phone, Mail, Dumbbell, CheckCircle, ArrowRight 
} from "lucide-react";
import "./index.css";

// ================== DATA ==================
const ALL_MUSCLES = [];
const LEVELS = [];

const PROGRAMS = [
  {
    id:'strength',
    title:'Strength Training',
    description:'Build muscle and increase power with structured strength training cycles.',
    image:'https://images.unsplash.com/photo-1584466977773-e625c37cdd50?q=80&w=687&auto=format&fit=crop',
    muscles:['chest','shoulder','back','legs','core'],
    level:'all'
  },
  {
    id:'crossfit',
    title:'CrossFit',
    description:'High-intensity functional movements for total body conditioning.',
    image:'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?q=80&w=1025&auto=format&fit=crop',
    muscles:['fullbody'],
    level:'intermediate'
  },
  {
    id:'yoga',
    title:'Yoga & Mobility',
    description:'Improve flexibility, balance, and mental wellness through yoga and mobility drills.',
    image:'https://images.unsplash.com/photo-1615657973599-990d6e05fb8a?q=80&w=765&auto=format&fit=crop',
    muscles:['core','shoulder'],
    level:'all'
  },
  {
    id:'hiit',
    title:'HIIT Training',
    description:'Maximum results in minimum time with high-intensity interval training.',
    image:'https://plus.unsplash.com/premium_photo-1664475050159-65f33efb695d?q=80&w=1172&auto=format&fit=crop',
    muscles:['fullbody'],
    level:'beginner'
  }
];

const EXERCISES = [
  {id:'bench-press',name:'Barbell Bench Press',muscle:'chest',level:'intermediate',reps:'4x6-10',image:'https://media.istockphoto.com/id/1028273740/photo/man-during-bench-press-exercise.jpg?s=1024x1024&w=is&k=20&c=hKyKS-kxLiBnZRBy8Uv7yStfY8_ao_MIf6HQcFNCcpw=',instructions:'Lie flat on a bench. Grip bar slightly wider than shoulder. Lower to chest and press up explosively.'},
  {id:'dumbbell-press',name:'Dumbbell Chest Press',muscle:'chest',level:'beginner',reps:'3x8-12',image:'https://media.istockphoto.com/id/1330593207/photo/body-building-workout-mens-fitness-exercise-with-hand-weights.jpg?s=2048x2048&w=is&k=20&c=wiqxG_ULONnE8awTmFGMPJZQzaxUVVumP9f-aMuj-W4=',instructions:'Press dumbbells up from chest while keeping shoulder blades retracted.'},
  {id:'overhead-press',name:'Overhead Press',muscle:'shoulder',level:'intermediate',reps:'4x6-10',image:'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',instructions:'Stand with feet hip-width. Press barbell overhead, locking arms at top.'},
  {id:'lat-pulldown',name:'Lat Pulldown',muscle:'back',level:'beginner',reps:'3x8-12',image:'https://media.istockphoto.com/id/896848584/photo/handsome-young-man-working-on-lat-machine.jpg?s=2048x2048&w=is&k=20&c=d7nMbcmCwEw1yhnhyda4VUYpfC05jo2XUtd77tvJJIo=',instructions:'Pull bar to upper chest, squeeze shoulder blades, control return.'},
  {id:'tricep-dip',name:'Triceps Dip',muscle:'triceps',level:'intermediate',reps:'3x8-15',image:'https://media.istockphoto.com/id/1296103301/photo/happy-sportswoman-leaning-on-the-sofa-and-practicing-triceps-dips-during-home-workout.jpg?s=2048x2048&w=is&k=20&c=sbam2pX6J-Py47HVjO3HLxaqmcsaVXwYwHHW1pAM-pQ=',instructions:'Lower body between parallel bars and press back up using triceps.'},
  {id:'bicep-curl',name:'Dumbbell Bicep Curl',muscle:'biceps',level:'newbie',reps:'3x10-15',image:'https://plus.unsplash.com/premium_photo-1661839129050-785891af4f87?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',instructions:'Curl weights with controlled tempo, avoid swinging.'},
  {id:'squat',name:'Back Squat',muscle:'legs',level:'intermediate',reps:'5x5',image:'https://plus.unsplash.com/premium_photo-1663045643599-2dad0d3c5054?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',instructions:'Bar across upper traps, squat below parallel with chest up.'},
  {id:'deadlift',name:'Deadlift',muscle:'back',level:'pro',reps:'5x3-5',image:'https://images.unsplash.com/photo-1534368270820-9de3d8053204?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',instructions:'Hip hinge, keep a neutral spine, drive through heels.'},
  {id:'plank',name:'Plank',muscle:'core',level:'newbie',reps:'3x30-60s',image:'https://images.unsplash.com/photo-1549576490-b0b4831ef60a?auto=format&w=800&q=60',instructions:'Hold a straight line from head to heels, brace core.'}
];

const MEMBERSHIP_PLANS = [
  { id:"basic", title:"Basic", price:"₹999 / month", features:["Gym Access","Group Classes","Locker Facility"] },
  { id:"premium", title:"Premium", price:"₹1999 / month", features:["All Basic","Personal Trainer","Diet Consultation"] },
  { id:"vip", title:"VIP", price:"₹4999 / month", features:["All Premium","Unlimited PT","Exclusive Lounge"] },
];

// ================== NAVBAR ==================
const Navbar = ({ page,setPage,mobileOpen,setMobileOpen }) => (
  <nav className="navbar">
    <div className="nav-container">
      <div className="logo" onClick={()=>setPage("home")}><Dumbbell /> POWERFIT</div>
      <div className={`nav-links ${mobileOpen?"open":""}`}>
        {["home","about","programs","membership","contact"].map(n=>(
          <button key={n} className={page===n?"active":""} onClick={()=>{setPage(n); setMobileOpen(false);}}>{n.toUpperCase()}</button>
        ))}
      </div>
      <div className="nav-buttons">
        <button className="mobile-menu" onClick={()=>setMobileOpen(!mobileOpen)}>
          {mobileOpen?<X/>:<Menu/>}
        </button>
      </div>
    </div>
  </nav>
);

// ================== FOOTER ==================
const Footer = ({ setPage }) => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-col">
        <div className="logo"><Dumbbell /> POWERFIT</div>
        <p>Transform your body, elevate your mind, and achieve greatness with POWERFIT.</p>
      </div>
      <div className="footer-col">
        <h4>Quick Links</h4>
        {["Home","About","Programs","Membership","Contact"].map(n=><button key={n} onClick={()=>setPage(n.toLowerCase())}>{n}</button>)}
      </div>
      <div className="footer-col">
        <h4>Programs</h4>
        <p>Strength Training</p>
        <p>CrossFit</p>
        <p>Yoga</p>
        <p>HIIT</p>
      </div>
      <div className="footer-col">
        <h4>Contact</h4>
        <p><MapPin /> 123 Gym Street, City</p>
        <p><Phone /> +91 12345 67890</p>
        <p><Mail /> contact@powerfit.com</p>
      </div>
    </div>
    <p className="copyright">&copy; 2025 POWERFIT. All rights reserved.</p>
  </footer>
);

// ================== ABOUT ==================
const About = () => (
  <section className="about">
    <div className="section-title"><h2>About POWERFIT</h2><p>Founded in 2015, POWERFIT transforms lives with world-class training.</p></div>
    <div className="about-grid">
      <div className="about-text">
        <h3>Our Story</h3>
        <p>POWERFIT was created to make professional fitness training accessible to everyone. Our members achieve goals with guidance, support, and a modern fitness environment.</p>
        <p>With experienced trainers, flexible schedules, and diverse programs, we help you unlock your full potential.</p>
      </div>
      <div className="about-images">
        <img src="https://plus.unsplash.com/premium_photo-1663036934563-125b1dd30df7?q=80&w=1155&auto=format&fit=crop" alt="Trainer"/>
        <img src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1170&auto=format&fit=crop" alt="Equipment"/>
        <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1220&auto=format&fit=crop" alt="Yoga"/>
        <img src="https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=1169&auto=format&fit=crop" alt="Workout"/>
      </div>
    </div>
  </section>
);

// ================== PROGRAMS ==================
const Programs = ({ onOpenExercise }) => {
  const [muscle,setMuscle] = useState("all");
  const [level,setLevel] = useState("all");
  const filtered = EXERCISES.filter(e=>(muscle==="all"?true:e.muscle===muscle)&&(level==="all"?true:e.level===level));
  return (
    <section className="programs">
      <div className="section-title"><h2>Our Programs</h2></div>
      <div className="filters">
        {ALL_MUSCLES.map(m=> <button key={m} className={muscle===m?"active":""} onClick={()=>setMuscle(m)}>{m.toUpperCase()}</button>)}
        {LEVELS.map(l=> <button key={l} className={level===l?"active":""} onClick={()=>setLevel(l)}>{l.toUpperCase()}</button>)}
      </div>
      <div className="program-cards">
        {PROGRAMS.map(p=>(
          <div key={p.id} className="card">
            <img src={p.image} alt={p.title}/>
            <div className="card-body">
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <button onClick={() => alert(`You joined the ${p.title} class successfully!`)}>Join Now</button>

            </div>
          </div>
        ))}
      </div>
      <h3 className="section-title">Exercises</h3>
      <div className="exercise-grid">
        {filtered.map(ex=>(
          <div key={ex.id} className="card" onClick={()=>onOpenExercise(ex)}>
            <img src={ex.image} alt={ex.name}/>
            <div className="card-body">
              <h4>{ex.name}</h4>
              <p>{ex.reps}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ================== MEMBERSHIP ==================
const Membership = () => {
  const [selected, setSelected] = useState(null);

  return (
    <section className="membership">
      <div className="section-title">
        <h2>Membership Plans</h2>
        <p>Choose the plan that suits you</p>
      </div>

      <div className="membership-grid">
        {MEMBERSHIP_PLANS.map(plan => (
          <div key={plan.id} className="membership-card">
            <h3>{plan.title}</h3>
            <h4>{plan.price}</h4>
            <ul>
              {plan.features.map((f,i) => (
                <li key={i}><CheckCircle /> {f}</li>
              ))}
            </ul>
            <button className="join-btn" onClick={() => setSelected(plan)}>
              Join Now <ArrowRight />
            </button>
          </div>
        ))}
      </div>

      {selected && (
        <div className="modal">
          <div className="modal-content">
            <button className="close" onClick={() => setSelected(null)}><X/></button>
            <h3>Join {selected.title} Plan</h3>
            <form onSubmit={(e) => { e.preventDefault(); alert("Membership Confirmed!"); setSelected(null); }}>
              <input type="text" placeholder="Full Name" required />
              <input type="email" placeholder="Email Address" required />
              <input type="tel" placeholder="Phone Number" required />
              <button type="submit" className="submit-btn">Confirm <CheckCircle/></button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

// ================== CONTACT ==================
const Contact = () => (
  <section className="contact">
    <div className="section-title"><h2>Contact Us</h2></div>
    <form>
      <input type="text" placeholder="Name" required/>
      <input type="email" placeholder="Email" required/>
      <textarea placeholder="Message" required></textarea>
      <button type="submit">Send Message</button>
    </form>
    <div className="contact-info">
      <p><MapPin /> 123 Gym Street, City</p>
      <p><Phone /> +91 12345 67890</p>
      <p><Mail /> contact@powerfit.com</p>
    </div>
  </section>
);

// ================== EXERCISE MODAL ==================
const ExerciseModal = ({ exercise,onClose }) => {
  if(!exercise) return null;
  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close" onClick={onClose}><X/></button>
        <img src={exercise.image} alt={exercise.name}/>
        <h3>{exercise.name}</h3>
        <p>{exercise.reps}</p>
        <p>{exercise.instructions}</p>
      </div>
    </div>
  )
}

// ================== APP ==================
export default function App(){
  const [page,setPage] = useState("home");
  const [mobileOpen,setMobileOpen] = useState(false);
  const [exercise,setExercise] = useState(null);
  return (
    <div className="App">
      <Navbar page={page} setPage={setPage} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}/>
      {page==="home" && <div className="home"><h1>POWERFIT GYM</h1><p>Transform your body, elevate your mind.</p></div>}
      {page==="about" && <About />}
      {page==="programs" && <Programs onOpenExercise={setExercise}/>}
      {page==="membership" && <Membership />}
      {page==="contact" && <Contact />}
      <Footer setPage={setPage}/>
      <ExerciseModal exercise={exercise} onClose={()=>setExercise(null)}/>
    </div>
  )
}
