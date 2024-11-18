import Watch from "./watch";

function Pomodoro() {
  return (
    <main>
      <header className="fixed w-full bg-neutral p-3 text-center text-primary shadow-lg border-b border-primary">
        <h1 className="title text-3xl">Codewithfocus</h1>
      </header>
      <Watch />
      <footer className="fixed bottom-0 w-full bg-neutral p-3 text-center ">
        <span className="text-sm">© copyright - {new Date().getFullYear()}</span>
      </footer>
    </main>
  );
}

export default Pomodoro;
