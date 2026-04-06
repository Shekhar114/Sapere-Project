import imgSapereBeeldmerklogoPng2 from "./b3a4a46ae6ce743e601e5c2fda9dfb646639c587.png";

function Frame3() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full">
      <div className="h-[281px] relative shrink-0 w-[302px]" data-name="SAPERE_beeldmerklogo.png 2">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgSapereBeeldmerklogoPng2} />
      </div>
      <p className="font-['Crimson_Pro:Medium',sans-serif] font-medium leading-[75px] min-w-full relative shrink-0 text-[36px] text-center text-white w-[min-content]">Your inside view into the world of luxury</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="bg-[#92671d] content-stretch flex items-center justify-center px-[32px] py-[10px] relative rounded-[59px] shrink-0">
      <p className="font-['Work_Sans:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#f5f3eb] text-[14px] text-center whitespace-nowrap">Submit</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-center justify-between pb-[8px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.5)] border-b border-solid inset-0 pointer-events-none" />
      <p className="font-['Crimson_Pro:Regular',sans-serif] font-normal leading-[75px] relative shrink-0 text-[16px] text-center text-white w-[76px]">Enter email</p>
      <Frame />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full">
      <Frame3 />
      <Frame1 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col items-center leading-[29.25px] relative shrink-0 text-[#8e8871] text-center w-full">
      <p className="decoration-solid font-['Work_Sans:Light',sans-serif] font-light relative shrink-0 text-[14px] underline w-full">Skip</p>
      <p className="font-['Work_Sans:Medium',sans-serif] font-medium relative shrink-0 text-[15px] w-full">By subscribing, you agree to receive the Sapere newsletter. Unsubscribe anytime</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] items-start left-[calc(20%+47.8px)] top-[203px] w-[595px]">
      <Frame4 />
      <Frame2 />
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="bg-[#332c0f] relative size-full" data-name="Landing page">
      <Frame5 />
    </div>
  );
}