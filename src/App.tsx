import React, { useMemo, useState } from 'react';

type Operator = '+' | '-' | '×' | '÷' | null;

type CalcState = {
    display: string;
    accumulator: number | null;
    operator: Operator;
    readyForNewEntry: boolean;
};

const initialState: CalcState = {
    display: '0',
    accumulator: null,
    operator: null,
    readyForNewEntry: true,
};

function formatDisplay(value: string): string {
    if (value === 'Infinity' || value === '-Infinity' || value === 'NaN')
        return 'Error';
    const [int, dec] = value.split('.');
    const withGrouping = Number(int).toLocaleString();
    return dec ? `${withGrouping}.${dec}` : withGrouping;
}

function evaluate(a: number, b: number, op: Operator): number {
    switch (op) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '×':
            return a * b;
        case '÷':
            return b === 0 ? NaN : a / b;
        default:
            return b;
    }
}

function App() {
    const [state, setState] = useState<CalcState>(initialState);

    const shown = useMemo(() => formatDisplay(state.display), [state.display]);

    function inputDigit(d: string) {
        setState((s) => {
            if (s.readyForNewEntry) {
                return {
                    ...s,
                    display: d === '.' ? '0.' : d,
                    readyForNewEntry: false,
                };
            }
            if (d === '.' && s.display.includes('.')) return s;
            if (s.display === '0' && d !== '.') return { ...s, display: d };
            return { ...s, display: s.display + d };
        });
    }

    function setOperator(next: Operator) {
        setState((s) => {
            const current = parseFloat(s.display.replace(/,/g, ''));
            if (s.operator && s.accumulator !== null && !s.readyForNewEntry) {
                const result = evaluate(s.accumulator, current, s.operator);
                return {
                    display: String(result),
                    accumulator: result,
                    operator: next,
                    readyForNewEntry: true,
                };
            }
            return {
                display: s.display,
                accumulator: current,
                operator: next,
                readyForNewEntry: true,
            };
        });
    }

    function equals() {
        setState((s) => {
            if (s.operator === null || s.accumulator === null) return s;
            const current = parseFloat(s.display.replace(/,/g, ''));
            const result = evaluate(s.accumulator, current, s.operator);
            return {
                display: String(result),
                accumulator: null,
                operator: null,
                readyForNewEntry: true,
            };
        });
    }

    function clearAll() {
        setState(initialState);
    }

    function invertSign() {
        setState((s) => ({
            ...s,
            display: String(-parseFloat(s.display.replace(/,/g, ''))),
        }));
    }

    function percent() {
        setState((s) => ({
            ...s,
            display: String(parseFloat(s.display.replace(/,/g, '')) / 100),
        }));
    }

    const Button: React.FC<{
        label: string;
        onClick?: () => void;
        variant?: 'op' | 'num' | 'util';
        span2?: boolean;
    }> = ({ label, onClick, variant = 'num', span2 = false }) => (
        <button
            onClick={onClick}
            className={[
                'h-14 rounded-xl text-lg font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring',
                variant === 'op' && 'bg-accent text-white hover:bg-blue-600',
                variant === 'num' &&
                    'bg-slate-800 text-slate-100 hover:bg-slate-700',
                variant === 'util' &&
                    'bg-slate-700 text-slate-100 hover:bg-slate-600',
                span2 ? 'col-span-2' : 'col-span-1',
            ]
                .filter(Boolean)
                .join(' ')}
        >
            {label}
        </button>
    );

    return (
        <div className="min-h-full flex items-center justify-center p-4 bg-slate-900">
            <div className="w-full max-w-sm bg-card rounded-2xl shadow-card border border-border overflow-hidden">
                <div className="p-5 bg-slate-900">
                    <div className="text-right text-5xl font-semibold text-white tracking-tight tabular-nums">
                        {shown}
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-3 p-5 bg-background">
                    <Button label="AC" onClick={clearAll} variant="util" />
                    <Button label="±" onClick={invertSign} variant="util" />
                    <Button label="%" onClick={percent} variant="util" />
                    <Button
                        label="÷"
                        onClick={() => setOperator('÷')}
                        variant="op"
                    />

                    <Button label="7" onClick={() => inputDigit('7')} />
                    <Button label="8" onClick={() => inputDigit('8')} />
                    <Button label="9" onClick={() => inputDigit('9')} />
                    <Button
                        label="×"
                        onClick={() => setOperator('×')}
                        variant="op"
                    />

                    <Button label="4" onClick={() => inputDigit('4')} />
                    <Button label="5" onClick={() => inputDigit('5')} />
                    <Button label="6" onClick={() => inputDigit('6')} />
                    <Button
                        label="-"
                        onClick={() => setOperator('-')}
                        variant="op"
                    />

                    <Button label="1" onClick={() => inputDigit('1')} />
                    <Button label="2" onClick={() => inputDigit('2')} />
                    <Button label="3" onClick={() => inputDigit('3')} />
                    <Button
                        label="+"
                        onClick={() => setOperator('+')}
                        variant="op"
                    />

                    <Button label="0" onClick={() => inputDigit('0')} span2 />
                    <Button label="." onClick={() => inputDigit('.')} />
                    <Button label="=" onClick={equals} variant="op" />
                </div>
            </div>
        </div>
    );
}

export default App;
