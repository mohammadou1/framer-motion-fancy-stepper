import { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const MIN = 0;
const MAX = 100;


export const Stepper = () => {
   const [value, setValue] = useState(0);
   const constraintsRef = useRef<HTMLDivElement>(null);
   const x = useMotionValue(0);
   const y = useMotionValue(0);

   const xAxis = useTransform(x, [-40, 0, 40], [-20, 0, 20]);
   const opacity = useTransform(y, [0, 20], [1, 0]);
   const opposite_opacity = useTransform(y, [0, 20], [0, 1]);

   const backgroundColor = useTransform(
      x,
      [-40, 0, 40],
      ['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.5)']
   );

   const decrease = () => setValue(prev => prev - 1 >= MIN ? prev - 1 : MIN);
   const increase = () => setValue(prev => prev + 1 <= MAX ? prev + 1 : MAX);
   const handleDragEnd = () => {
      const currentY = y.get();
      const currentX = x.get();

      if (currentY > 20) {
         setValue(0);
         return;
      }
      if(currentX > 40) {
        increase();
         return;
      }
        if(currentX < -40) {
        decrease();
         return;
        }
   };

   return (
      <motion.div
         ref={constraintsRef}
         style={{ x: xAxis, backgroundColor }}
         className="w-[200px] h-[70px] rounded-full flex items-center justify-between relative">
         <motion.div
            className="absolute inset-0 -z-10 rounded-full flex items-center justify-center"
            style={{ opacity: opposite_opacity }}>
            {/* close svg icon */}
            <svg
               className="w-7 h-7"
               xmlns="http://www.w3.org/2000/svg"
               width="24"
               height="24"
               viewBox="0 0 24 24">
               <path
                  d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
                  fill="white"
                  fillOpacity={0.5}
               />
            </svg>
         </motion.div>
         <motion.button
            onClick={decrease}
            className="px-4 h-full rounded-l-full"
            style={{ opacity }}>
            <svg
               className="w-7 h-7"
               xmlns="http://www.w3.org/2000/svg"
               width="24"
               height="24"
               viewBox="0 0 24 24">
               <path d="M19 13H5v-2h14v2z" fill="white" fillOpacity={0.3} />
            </svg>
         </motion.button>

         <motion.button
            className="text-white text-xl bg-white/20 w-14 h-14 leading-none rounded-full shadow-[3px_0px_5px_rgba(0,0,0,0.3)]"
            onClick={increase}
            dragMomentum={false}
            style={{ x, y }}
            drag
            dragDirectionLock
            dragConstraints={{ left: 0, right: 0, bottom: 0, top: 0 }}
            dragElastic={{
                left: 0.1,
                right: 0.1,
                bottom: 0.1,
                top: 0
            }}
            dragTransition={{
               max: 0,
               min: 0,
               restDelta: 0.5,
               bounceStiffness: 250,
               bounceDamping: 10,
               power: 0,
            }}
            onDragEnd={handleDragEnd}>
            {value}
         </motion.button>

         <motion.button
            onClick={increase}
            className="px-4 rounded-r-full h-full"
            style={{ opacity }}>
            <svg
               className="w-7 h-7"
               xmlns="http://www.w3.org/2000/svg"
               width="24"
               height="24"
               viewBox="0 0 24 24">
               <path d="M19 13H13v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="white" fillOpacity={0.4} />
            </svg>
         </motion.button>
      </motion.div>
   );
};
