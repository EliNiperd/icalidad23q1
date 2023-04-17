import { motion, useCycle } from "framer-motion";

const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="2"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

export const MenuToggle = ({ toggle }) => (
  <>
    <button
      onClick={toggle}
      className="cursor-pointer absolute top-3 left-5 w-11 h-11 rounded-full bg-[#DEF0FA] border-[#30A9ED] shadow-md shadow-slate-500"
    >
      <svg width="44" height="44" viewBox="0 0 44 44">
        <Path
          variants={{
            closed: { d: "M 13 16 L 30 16" },
            open: { d: "M 13 16 L 30 30" },
          }}
        />
        <Path
          d="M 13 23 L 30 23"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.1 }}
        />
        <Path
          variants={{
            closed: { d: "M 13 30 L 30 30" },
            open: { d: "M 13 30 L 30 16" },
          }}
        />
      </svg>
    </button>
   
  </>
);

/*
 <motion.div className="absolute top-3 left-5 w-auto h-auto p-2 items-start rounded-md bg-[#DEF0FA] border-[#30A9ED] shadow-md shadow-slate-500"
      animate={{
        x: "500px",
      }}

      transition={{
        type:"delay",
        duration: 2,
      }}
    >
      <h1 className="text-3xl bg-[#30A9ED] my-4 mr-4 p-2 rounded-md text-white ">Invitado Especial:</h1>
    </motion.div>
<button onclick={toggle} className='cursor-pointer absolute top-4 left-4 w-11 h-11 rounded-full bg-red-700' >
<svg width="23" height="23" viewBox="0 0 23 23" >
    <Path variants={{
        closed: { d: "M 2 2.5 L 20 2.5" },
        open: { d: "M 3 16.5 L 17 2.5" }
    }}
    />
    <Path d="M 2 9.423 L 20 9.423"
        variants={{ 
            closed: { opacity: 1 },
            open: { opacity: 0 }
        }}
        transition={{ duration: 0.1 }} 
    />
</svg>
</button>   
<svg viewBox="0 0 60 60">
    <circle cx="30" cy="30" r="20" />
      <Path d="m14,28 h32 " stroke='#ffffff' strokeWidth='.02em' strokeLinecap="round" fill="transparent"   />
      <Path d="m14,30 h32 " stroke='#ffffff' strokeWidth='.02em' strokeLinecap="round" fill="transparent"   />
      <Path d="m14,32 h32 " stroke='#ffffff' strokeWidth='.02em' strokeLinecap="round" fill="transparent"   />
    </svg>

*/
