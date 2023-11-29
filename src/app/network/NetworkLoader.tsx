// import { useRef, useState, useEffect } from 'react';

// type NetworkLoaderType = {
//   networkPerformance: {
//     script: {
//       totalSize: number;
//       transferred: number;
//     };
//     html: {
//       totalSize: number;
//       transferred: number;
//     };
//     css: {
//       totalSize: number;
//       transferred: number;
//     };
//     img: {
//       totalSize: number;
//       transferred: number;
//     };
//     other: {
//       totalSize: number;
//       transferred: number;
//     };
//   };
// };

// /** Network Import Skeleton Loader */
// const NetworkLoader = ({ networkPerformance }: NetworkLoaderType) => {
//   const networkLoader = useRef<HTMLDivElement>(null);
//   const [userLanded, setUserLanded] = useState<boolean>(true);

//   /** Initialize loading transition */
//   useEffect(() => {
//     userLanded ? networkLoader.current?.setAttribute('data-transition', 'true') : networkLoader.current?.setAttribute('data-transition', 'false');
//   }, [userLanded]);

//   /** Component */
//   if (userLanded)
//     return (
//       <div className='networkLoader' ref={networkLoader}>
//         <div>
//           <span>Scripts</span>
//           <p>Size: {networkPerformance.script.totalSize}</p>
//           <p>Loaded: {networkPerformance.script.transferred}</p>
//         </div>
//         <br />
//         <div>
//           <span>HTML</span>
//           <p>Size: {networkPerformance.html.totalSize}</p>
//           <p>Loaded: {networkPerformance.html.transferred}</p>
//         </div>
//         <br />
//         <div>
//           <span>CSS</span>
//           <p>Size: {networkPerformance.css.totalSize}</p>
//           <p>Loaded: {networkPerformance.css.transferred}</p>
//         </div>
//         <br />
//         <div>
//           <span>Assets</span>
//           <p>Size: {networkPerformance.img.totalSize}</p>
//           <p>Loaded: {networkPerformance.img.transferred}</p>
//         </div>
//         <br />
//         <div>
//           <span>Other</span>
//           <p>Size: {networkPerformance.other.totalSize}</p>
//           <p>Loaded: {networkPerformance.other.transferred}</p>
//         </div>
//       </div>
//     );
// };
// export default NetworkLoader;
