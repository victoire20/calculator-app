import {useEffect, useRef, useState} from "react";

const themes = ['light', 'purple']

const Header = () => {
    const toggleRef = useRef<HTMLDivElement>(null)
    const [theme, setTheme] = useState(() => {
        const saved = String(localStorage.getItem('theme'))
        return themes.includes(saved) ? saved : ''
    })

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem("theme", theme)

        const toggle = toggleRef.current
        if (!toggle) return

        if (theme === "") toggle.style.transform = "translateX(0px)"
        if (theme === "light") toggle.style.transform = "translateX(25px)"
        if (theme === "purple") toggle.style.transform = "translateX(50px)"
    }, [theme])

    const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch(e.target.value) {
            case "t1":
                setTheme("")
                break
            case "t2":
                setTheme("light")
                break
            case "t3":
                setTheme("purple")
                break
        }
    }

    return <div className="text-header flex justify-between items-center mb-7.5" style={{marginBottom: "30px"}}>
        <h1 className="text-3xl self-end">calc</h1>
        <div className="flex justify-between items-end gap-7 text-sm">
            <span>THEME</span>
            <div className="w-20 position-relative relative">
                <div className="flex justify-between px-2.5">
                    <label className="hover:cursor-pointer" htmlFor="t1">1</label>
                    <label htmlFor="t2">2</label>
                    <label htmlFor="t3">3</label>
                </div>
                <div className="theme-switch">
                    <div className="check-theme flex justify-between w-16.25 absolute z-50 top-[55%] left-[8%]">
                        <input
                            className="opacity-0 cursor-pointer"
                            value="t1"
                            type="radio"
                            name="t"
                            id="t1"
                            checked={theme === ""}
                            onChange={handleThemeChange}
                        />

                        <input
                            className="opacity-0 cursor-pointer"
                            value="t2"
                            type="radio"
                            name="t"
                            id="t2"
                            checked={theme === "light"}
                            onChange={handleThemeChange}
                        />

                        <input
                            className="opacity-0 cursor-pointer"
                            value="t3"
                            type="radio"
                            name="t"
                            id="t3"
                            checked={theme === "purple"}
                            onChange={handleThemeChange}
                        />
                    </div>
                    <div className="track bg-toggle-background">
                        <div ref={toggleRef} className="thumb bg-(--secondary-color)"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default Header