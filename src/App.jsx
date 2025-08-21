import React, { useState, useMemo} from 'react';

// --- COMPONENT DATABASE ---
// Updated with more budget-friendly options for the Indian market.
const componentDB = {
    cpu: [
        { id: 0, name: "Intel Core i3-12100F", price: 7500, socket: "LGA1700", tier: 'budget' },
        { id: 1, name: "AMD Ryzen 5 5600G", price: 11000, socket: "AM4", tier: 'budget' }, // Excellent integrated graphics
        { id: 2, name: "AMD Ryzen 5 7600X", price: 22000, socket: "AM5", tier: 'entry' },
        { id: 3, name: "Intel Core i5-13400F", price: 24000, socket: "LGA1700", tier: 'entry' },
        { id: 4, name: "AMD Ryzen 5 9600X", price: 28000, socket: "AM5", tier: 'mid' },
        { id: 5, name: "AMD Ryzen 7 9800X3D", price: 45000, socket: "AM5", tier: 'high' },
        { id: 6, name: "Intel Core i7-14700K", price: 48000, socket: "LGA1700", tier: 'high' },
        { id: 7, name: "AMD Ryzen 9 9950X3D", price: 65000, socket: "AM5", tier: 'enthusiast' },
    ],
    motherboard: [
        { id: 10, name: "MSI PRO H610M-G", price: 6500, socket: "LGA1700", ramType: "DDR4", tier: 'budget' },
        { id: 11, name: "ASRock A520M-HDV", price: 5500, socket: "AM4", ramType: "DDR4", tier: 'budget' },
        { id: 12, name: "ASRock B650M-HDV/M.2", price: 11000, socket: "AM5", ramType: "DDR5", tier: 'entry' },
        { id: 13, name: "ASUS TUF Gaming B760M-PLUS", price: 15000, socket: "LGA1700", ramType: "DDR5", tier: 'entry' },
        { id: 14, name: "ASUS TUF Gaming B650-PLUS", price: 19000, socket: "AM5", ramType: "DDR5", tier: 'mid' },
        { id: 15, name: "MSI MAG X870E TOMAHAWK", price: 32000, socket: "AM5", ramType: "DDR5", tier: 'high' },
        { id: 16, name: "ASUS ROG STRIX Z790-E", price: 45000, socket: "LGA1700", ramType: "DDR5", tier: 'high' },
        { id: 17, name: "ASUS ROG CROSSHAIR X870E", price: 55000, socket: "AM5", ramType: "DDR5", tier: 'enthusiast' },
    ],
    gpu: [
        { id: 20, name: "Integrated Graphics (on CPU)", price: 0, tier: 'budget' },
        { id: 21, name: "AMD Radeon RX 6600 8GB", price: 20000, tier: 'entry' },
        { id: 22, name: "NVIDIA GeForce RTX 4060 8GB", price: 29000, tier: 'entry' },
        { id: 23, name: "AMD Radeon RX 9060 XT 8GB", price: 35000, tier: 'mid' },
        { id: 24, name: "NVIDIA GeForce RTX 5060 Ti 16GB", price: 48000, tier: 'mid' },
        { id: 25, name: "NVIDIA GeForce RTX 5080", price: 90000, tier: 'high' },
        { id: 26, name: "NVIDIA GeForce RTX 5090", price: 180000, tier: 'enthusiast' },
    ],
    ram: [
        { id: 29, name: "8GB (1x8GB) DDR4 3200MHz", price: 1800, type: "DDR4", tier: 'ultra-budget' },
        { id: 30, name: "16GB (2x8GB) DDR4 3200MHz", price: 3500, type: "DDR4", tier: 'budget' },
        { id: 31, name: "16GB (2x8GB) DDR5 5200MHz", price: 7000, type: "DDR5", tier: 'entry' },
        { id: 32, name: "32GB (2x16GB) DDR5 5600MHz", price: 12000, type: "DDR5", tier: 'mid' },
        { id: 33, name: "32GB (2x16GB) DDR5 6000MHz", price: 15000, type: "DDR5", tier: 'high' },
        { id: 34, name: "64GB (2x32GB) DDR5 6400MHz", price: 25000, type: "DDR5", tier: 'enthusiast' },
    ],
    ssd: [
        { id: 39, name: "256GB NVMe PCIe 3.0 SSD", price: 2200, tier: 'ultra-budget' },
        { id: 40, name: "512GB NVMe PCIe 3.0 SSD", price: 3000, tier: 'budget' },
        { id: 41, name: "1TB NVMe PCIe 4.0 SSD", price: 8000, tier: 'entry' },
        { id: 42, name: "2TB NVMe PCIe 4.0 SSD", price: 14000, tier: 'mid' },
        { id: 43, name: "2TB NVMe PCIe 5.0 SSD", price: 22000, tier: 'high' },
        { id: 44, name: "4TB NVMe PCIe 5.0 SSD", price: 40000, tier: 'enthusiast' },
    ],
    psu: [
        { id: 49, name: "400W Basic PSU", price: 1500, tier: 'ultra-budget' },
        { id: 50, name: "450W 80+ Bronze", price: 2500, tier: 'budget' },
        { id: 51, name: "650W 80+ Bronze", price: 5000, tier: 'entry' },
        { id: 52, name: "750W 80+ Gold", price: 9000, tier: 'mid' },
        { id: 53, name: "850W 80+ Gold", price: 12000, tier: 'high' },
        { id: 54, name: "1200W 80+ Platinum", price: 22000, tier: 'enthusiast' },
    ],
    cooler: [
        { id: 60, name: "Stock Cooler (included with CPU)", price: 0, tier: 'budget' },
        { id: 61, name: "Cooler Master Hyper 212", price: 3000, tier: 'entry' },
        { id: 62, name: "Cooler Master MasterLiquid 240L", price: 7000, tier: 'mid' },
        { id: 63, name: "Lian Li Galahad II Trinity 360", price: 14000, tier: 'high' },
        { id: 64, name: "Custom Liquid Cooling Loop", price: 30000, tier: 'enthusiast' },
    ],
    case: [
        { id: 69, name: "Basic Cabinet", price: 1500, tier: 'ultra-budget' },
        { id: 70, name: "Generic Mid Tower Case", price: 2500, tier: 'budget' },
        { id: 71, name: "Deepcool CC560", price: 4000, tier: 'entry' },
        { id: 72, name: "Corsair 4000D Airflow", price: 8000, tier: 'mid' },
        { id: 73, name: "Lian Li Lancool 216", price: 10000, tier: 'high' },
        { id: 74, name: "Corsair 7000D Airflow", price: 18000, tier: 'enthusiast' },
    ],
};

// --- HELPER FUNCTIONS ---

const findBestComponent = (category, budget) => {
    return componentDB[category]
        .filter(c => c.price <= budget)
        .sort((a, b) => b.price - a.price)[0] || null;
};

const findCompatibleComponent = (category, budget, constraints) => {
    return componentDB[category]
        .filter(c => {
            if (c.price > budget) return false;
            for (const key in constraints) {
                if (c[key] !== constraints[key]) return false;
            }
            return true;
        })
        .sort((a, b) => b.price - a.price)[0] || null;
};


// --- UI COMPONENTS ---

const BudgetInput = ({ budget, setBudget, onGenerate }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Enter Your Budget (₹)</h2>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
            <input
                type="range"
                min="30000"
                max="500000"
                step="2500"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="e.g., 120000"
                className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 transition w-full sm:w-48 text-center font-semibold"
            />
        </div>
        <button
            onClick={onGenerate}
            className="mt-6 w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-md hover:bg-indigo-700 transition-transform transform hover:scale-105 duration-300"
        >
            Generate Build
        </button>
    </div>
);

const ComponentCard = ({ type, name, price }) => {
    const amazonUrl = `https://www.amazon.in/s?k=${encodeURIComponent(name)}`;
    const neweggUrl = `https://www.newegg.com/global/in-en/p/pl?d=${encodeURIComponent(name)}`;

    return (
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
            <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center font-bold text-gray-500">
                    {type.substring(0, 4).toUpperCase()}
                </div>
            </div>
            <div className="flex-grow text-center sm:text-left">
                <p className="font-semibold text-gray-500 text-sm">{type}</p>
                <h4 className="font-bold text-lg text-gray-800">{name}</h4>
            </div>
            <div className="text-center sm:text-right">
                <p className="font-bold text-indigo-600 text-xl">₹{price.toLocaleString('en-IN')}</p>
                 <div className="flex gap-2 mt-2">
                     <a href={amazonUrl} target="_blank" rel="noopener noreferrer" className="bg-yellow-400 text-gray-800 text-xs font-bold py-1 px-3 rounded hover:bg-yellow-500 transition-colors">Amazon</a>
                     <a href={neweggUrl} target="_blank" rel="noopener noreferrer" className="bg-orange-500 text-white text-xs font-bold py-1 px-3 rounded hover:bg-orange-600 transition-colors">Newegg</a>
                </div>
            </div>
        </div>
    );
};

const BuildResult = ({ build, totalCost, budget }) => {
    if (!build) return null;
    
    const budgetDifference = budget - totalCost;

    return (
        <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-3xl mx-auto mt-10 animate-fade-in">
            <div className="text-center mb-6 border-b pb-4">
                <h3 className="text-3xl font-extrabold text-gray-900">Your Custom PC Build</h3>
                <p className="text-2xl font-bold text-indigo-600 mt-2">Total Cost: ₹{totalCost.toLocaleString('en-IN')}</p>
                <p className={`mt-1 font-semibold ${budgetDifference >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {budgetDifference >= 0 
                        ? `₹${budgetDifference.toLocaleString('en-IN')} under budget`
                        : `₹${(-budgetDifference).toLocaleString('en-IN')} over budget`
                    }
                </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
                {Object.entries(build).map(([type, component]) => (
                    component && <ComponentCard key={component.id} type={type} name={component.name} price={component.price} />
                ))}
            </div>
        </div>
    );
};


// --- MAIN APP COMPONENT ---

export default function App() {
    const [budget, setBudget] = useState(85000);
    const [generatedBuild, setGeneratedBuild] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    
    const handleGenerateBuild = () => {
        setErrorMessage('');
        setGeneratedBuild(null);
        
        const numBudget = Number(budget);
        if (isNaN(numBudget) || numBudget < 30000) {
            setErrorMessage("Minimum budget is ₹30,000 to ensure a functional build.");
            return;
        }

        // --- SMARTER BUILD LOGIC ---
        const build = {};
        let remainingBudget = numBudget;

        // 1. Allocate budget for core components first
        const allocation = { gpu: 0.40, cpu: 0.20 };

        // 2. Special logic for ultra-low budgets: Prioritize integrated graphics
        if (numBudget < 45000) {
             build.cpu = componentDB.cpu.find(c => c.name === "AMD Ryzen 5 5600G");
             build.gpu = componentDB.gpu.find(g => g.price === 0);
        } else {
            // For other budgets, select the best GPU and CPU you can afford
            build.gpu = findBestComponent('gpu', remainingBudget * allocation.gpu);
            build.cpu = findBestComponent('cpu', remainingBudget * allocation.cpu);
        }
        
        if (!build.gpu || !build.cpu) { setErrorMessage("Could not find a suitable CPU/GPU for this budget."); return; }
        
        remainingBudget -= (build.gpu.price + build.cpu.price);

        // 3. Select compatible Motherboard and RAM, using remaining budget
        build.motherboard = findCompatibleComponent('motherboard', remainingBudget, { socket: build.cpu.socket });
        if (!build.motherboard) { setErrorMessage("Could not find a compatible motherboard for the selected CPU."); return; }
        remainingBudget -= build.motherboard.price;

        build.ram = findCompatibleComponent('ram', remainingBudget, { type: build.motherboard.ramType });
        if (!build.ram) { setErrorMessage("Could not find compatible RAM for the selected motherboard."); return; }
        remainingBudget -= build.ram.price;

        // 4. Use the rest of the budget to get the best possible remaining parts
        const remainingParts = ['ssd', 'psu', 'case', 'cooler'];
        remainingParts.forEach(partType => {
            const bestPart = findBestComponent(partType, remainingBudget);
            if(bestPart) {
                build[partType] = bestPart;
                remainingBudget -= bestPart.price;
            }
        });

        // 5. Final check for missing essential parts with a fallback to the cheapest option
        ['ssd', 'psu', 'case', 'cooler'].forEach(partType => {
            if (!build[partType]) {
                build[partType] = componentDB[partType].sort((a,b) => a.price - b.price)[0];
            }
        });

        setGeneratedBuild(build);
    };

    const totalCost = useMemo(() => {
        if (!generatedBuild) return 0;
        return Object.values(generatedBuild).reduce((sum, comp) => sum + (comp ? comp.price : 0), 0);
    }, [generatedBuild]);

    return (
        <div className="bg-gray-100 min-h-screen text-gray-800 font-sans p-4 md:p-8">
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
            `}</style>
            <div className="container mx-auto">
                <header className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                        Smart PC Builder
                    </h1>
                    <p className="text-lg text-gray-600 mt-2">
                        Get an optimized, compatible PC build for your exact budget.
                    </p>
                </header>

                <main>
                    <BudgetInput budget={budget} setBudget={setBudget} onGenerate={handleGenerateBuild} />
                    
                    {errorMessage && (
                        <div className="mt-6 text-center text-red-600 font-semibold bg-red-100 p-3 rounded-lg max-w-3xl mx-auto">
                            {errorMessage}
                        </div>
                    )}

                    <BuildResult build={generatedBuild} totalCost={totalCost} budget={budget} />
                </main>
            </div>
        </div>
    );
}
