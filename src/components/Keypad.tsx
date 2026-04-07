import type { Button } from "../types/keypad.types.ts";


type params = {
    keys: Array<Button>,
    handleClick: (key: Button) => void,
}

const Keypad = ({ keys, handleClick }: params) => {
    return <div className="bg-keypad-background rounded-md max-h-150 p-5 grid grid-cols-4 gap-4 text-[20px] md:text-[32px]">
        {keys.map((key, index) => (
            <button
                key={index}
                className={`
                    w-full rounded hover:cursor-pointer active:transform-[translate(0px,5px)]
                    ${key.color === 'normal' ? 'bg-(--info-color) text-keypad shadow-[0_4px_0_var(--info-color-shadow)] md:shadow-[0_6px_0_var(--info-color-shadow)] ' : ''}
                    ${key.color === 'special' ? 'bg-(--primary-color) text-white shadow-[0_4px_0_var(--primary-color-shadow)] md:shadow-[0_6px_0_var(--primary-color-shadow)] ' : ''}
                    ${key.color === 'red' ? 'bg-(--secondary-color) text-equal shadow-[0_4px_0_var(--secondary-color-shadow)] md:shadow-[0_6px_0_var(--secondary-color-shadow)] ' : ''}
                `}
                style={{ gridColumn: key.colSpan ? `span ${key.colSpan}` : undefined }}
                onClick={() => handleClick(key)}
            >
                {key.label}
            </button>
        ))}
    </div>
}

export default Keypad