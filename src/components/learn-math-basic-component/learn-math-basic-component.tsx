import { Component, Prop, State } from '@stencil/core';

@Component({
    tag: 'learn-math-basic-component',
    styleUrl: 'learn-math-basic-component.scss',
    shadow: true
})
export class LearnMathBasicComponent {
    private possibleTypes = ['ADD', 'MINUS', 'MULTIPLY', 'DIVIDE'];

    @Prop() max: number = 10;
    @Prop({ reflectToAttr: true }) min: number = 1;
    @Prop() type: string = 'ADD';

    @State() errorMessages: string[];

    /**
     * Validate values which have been passed to this component
     */
    componentWillLoad() {
        this.errorMessages = [];
        if (this.min >= this.max) { this.errorMessages.push(`MIN should be less then the MAX`) };
        if (!this.possibleTypes.includes(this.type)) { this.errorMessages.push(`Invalid type passed, it should be one of ${this.possibleTypes.join(', ')}`) }

        if (this.errorMessages && this.errorMessages.length > 0)
            throw new Error(this.errorMessages.join('\n\n'));
    }

    /**
     * Get Symbol which needs to be shown
     */
    private getSymbol(): string {
        switch (this.type) {
            case 'ADD':
                return '+';
            case 'MINUS':
                return '-';
            case 'MULTIPLY':
                return '*';
            case 'DIVIDE':
                return '/';
        }
    }

    /**
     * Calculate correct answer based on provided inputs
     * @param num1 
     * @param num2 
     */
    private calculateAns(num1, num2): number {
        switch (this.type) {
            case 'ADD':
                return num1 + num2;
            case 'MINUS':
                return num1 - num2;
            case 'MULTIPLY':
                return num1 * num2;
            case 'DIVIDE':
                return num1 / num2;
        }
    }

    /**
     * Used when type is set to Divide to figure out a random Divider to be used withing the given limit
     * @param num 
     * @param min 
     */
    private findRandomPossibleDividers(num, min): number {
        const result = [];
        let i = num;
        while (i) {
            if ((num / i) % 1 == 0 && i >= min) {
                result.push(i)
            }
            i--
        }
        return result[Math.floor(Math.random() * result.length)];;
    }

    /**
     * Calculate random numbers to be shown and the correct answer. Then return all numbers as a array with [Number1, Number2, Result]
     */
    private getNumbers(): number[] {
        // Calculate the first number
        let num1 = Math.floor(Math.random() * (+this.max - +this.min)) + +this.min;
        // Calculate the second number
        let num2 = this.min;

        // If we need to perform a minus, make sure that num2 is less then num1
        if (this.type === 'MINUS') {
            num2 = Math.floor(Math.random() * (+num1 - +this.min)) + +this.min;
        }
        // If we need to perform a division make sure num2 is more than ZERO
        else if (this.type === 'DIVIDE') {
            num2 = this.findRandomPossibleDividers(num1, this.min) || 1;
        } else {
            // Just a random number between @min and @max
            num2 = Math.floor(Math.random() * (+this.max - +this.min)) + +this.min;;
        }

        return [num1, num2, this.calculateAns(num1, num2)];
    }

    /**
     * Render our UI / Error
     */
    render() {
        if (this.errorMessages && this.errorMessages.length > 0) {
            return (<div class="error">
                <h4>Errors!!</h4>
                {this.errorMessages.map((msg, i) => <div>{i + 1} - {msg}</div>)}
            </div>)
        } else {
            const numbers = this.getNumbers();
            return (
                <div class="container">
                    <div class="number1">{numbers[0]}</div>
                    <div class="number2">{numbers[1]}</div>
                    <div class="symbol">{this.getSymbol()}</div>
                    <div class="result">{numbers[2]}</div>
                </div>
            );
        }
    }
}
