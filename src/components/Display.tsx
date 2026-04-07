import {useEffect, useRef, useState} from "react";

type params = {
    digitsDisplay: string
}

const Display = ({ digitsDisplay }: params) => {

    const displayRef = useRef<HTMLDivElement>(null)
    const spanRef = useRef<HTMLSpanElement>(null)

    const [fontSize, setFontSize] = useState(32)

    useEffect(() => {
        const container = displayRef.current
        const text = spanRef.current

        if (!container || !text) return

        const textContainer = container.clientWidth

        if ((text.scrollWidth + 21) >= (textContainer - 21)) {
            setFontSize(prev => Math.max(prev - 2, 10))
        } else if ((text.scrollWidth + 21 ) <= ((2.3/3) * textContainer)) {
            setFontSize(32)
        }
    }, [digitsDisplay])

    return <div
        ref={displayRef}
        className="bg-screen-background rounded-md h-20 mb-7.5 flex justify-end items-center text-header"
        style={{marginBottom: "30px", padding: "20px"}}>
        <span
            ref={spanRef}
            style={{ fontSize: `${fontSize}px` }}
            className="whitespace-nowrap"
        >
            {digitsDisplay}
        </span>
    </div>
}

export default Display