import { PhaserGame } from './PhaserGame';

function App()
{
    return (
        <div className="min-h-screen w-full bg-white text-black flex items-center justify-center px-4 py-6">
            <PhaserGame className="w-full max-w-[1024px] aspect-[4/3]" />
        </div>
    )
}

export default App
