"use client";
import React, { useReducer } from "react";
type DrawingState = {
  remain: number[];
  beenDrew: number[];
  current: number;
  isDrawing: boolean;
};
interface ActionType {
  type: "drawing" | "reset";
}

const init: DrawingState = {
  remain: [
    1,
    2,
    3,
    3,
    ...Array<number>(5).fill(4),
    ...Array<number>(11).fill(5),
  ],
  beenDrew: [],
  current: 0,
  isDrawing: false,
};
const prizesClassname: { [key: number]: string } = {
  0: "bg-slate-100 text-slate-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded",
  1: "bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded",
  2: "bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded",
  3: "bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded",
  4: "bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded",
  5: "bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded",
};
function reducer(state: DrawingState, action: ActionType) {
  const newRemain = [...state.remain];
  const prize = getPrize();
  switch (action.type) {
    case "drawing":
      /* 抽完了 */
      if (state.remain.length === 0) return { ...state };
      /* 抽到0 */
      if (prize === 0) {
        return {
          ...state,
          current: 0,
          isDrawing: true,
          beenDrew: [...state.beenDrew, 0],
        };
      }

      if (!state.remain.includes(prize)) {
        return {
          ...state,
          current: 0,
          isDrawing: true,
          beenDrew: [...state.beenDrew, 0],
        };
      }
      /* 找到獎項index並移除一個 */
      newRemain.splice(newRemain.indexOf(prize), 1);
      return {
        ...state,
        remain: newRemain,
        beenDrew: [...state.beenDrew, prize],
        current: prize,
        isDrawing: true,
      };
    case "reset":
      return init;

    default:
      return init;
  }
}
export default function Drawing() {
  const [prizes, dispatch] = useReducer(reducer, init);
  const handleDrawingClick = () => {
    console.log("first");
    dispatch({ type: "drawing" });
  };
  const handleResetClick = () => {
    dispatch({ type: "reset" });
  };

  return (
    <section>
      <div
        className="m-auto flex flex-col items-center justify-center 
      min-h-screen  bg-main "
      >
        <h1>Quiz2</h1>
        <div>
          {!prizes.isDrawing
            ? "請抽獎"
            : prizes.remain.length === 0
            ? "抽完了"
            : prizes.current
            ? "抽到獎項" + prizes.current
            : "恭喜，安慰獎。"}
        </div>

        <div>
          <div className="mb-1 ">
            <div className="font-bold text-xl ">剩餘獎項:</div>
            <Prizes prizes={prizes} p={1} />
            <Prizes prizes={prizes} p={2} />
            <Prizes prizes={prizes} p={3} />
            <Prizes prizes={prizes} p={4} />
            <Prizes prizes={prizes} p={5} />
          </div>

          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 animate-bounce hover:animate-none"
            onClick={handleDrawingClick}
          >
            抽獎
          </button>
          <button
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            onClick={handleResetClick}
          >
            重置獎項
          </button>
        </div>
        {prizes.isDrawing && (
          <div className="flex flex-wrap max-w-[500px]">
            {prizes.beenDrew.map((v, i) => (
              <div key={i + "beenDrew"} className={`${prizesClassname[v]}`}>
                {(v === 0 && "安慰獎") || `獎項${v}`}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
function getPrize() {
  /* 
  這邊只有固定住機率，沒有考慮獎池有沒有殘餘獎項。
1 獎中獎機率為 0.1% 
2 獎中獎機率為 2.3%
3 獎中獎機率為 13%
4 獎中獎機率為 18%
5 獎中獎機率為 25% 
*/

  const value = Math.random();
  if (value <= 0.001) return 1;
  if (value <= 0.001 + 0.023) return 2;
  if (value <= 0.001 + 0.023 + 0.13) return 3;
  if (value <= 0.001 + 0.023 + 0.13 + 0.18) return 4;
  if (value <= 0.001 + 0.023 + 0.13 + 0.18 + 0.25) return 5;
  return 0;
}
/* 
驗證一下  -> 獎項/總抽
抽一萬次，看看獎項分布。
const arr =[]
for(let i=0;i<100000;i++){
  arr.push(getPrizes())
}
console.log(arr.filter(x => x==1).length/arr.length)//0.00098
console.log(arr.filter(x => x==2).length/arr.length)//0.02339
console.log(arr.filter(x => x==3).length/arr.length)//0.12957
console.log(arr.filter(x => x==4).length/arr.length)//0.18071
console.log(arr.filter(x => x==5).length/arr.length)//0.2487
console.log(arr.filter(x => x==0).length/arr.length)//0.41665
*/

function Prizes({ prizes, p }: { prizes: DrawingState; p: number }) {
  return prizes.remain.filter((v) => v === p).length > 0 ? (
    <div className="flex gap-y-2 mb-2">
      {prizes.remain
        .filter((v) => v === p)
        .map((v) => (
          <span key={crypto.randomUUID()} className={prizesClassname[v]}>
            獎項:{v}{" "}
          </span>
        ))}
    </div>
  ) : (
    <div>{p}獎抽完了</div>
  );
}
