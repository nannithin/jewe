export default function Loader() {
  return (
    <div className="flex items-center justify-center">
      <div className="loader relative w-20 h-20">
        <span className="diamond top"></span>
        <span className="diamond left"></span>
        <span className="diamond right"></span>
        <span className="diamond bottom"></span>
      </div>
    </div>
  );
}