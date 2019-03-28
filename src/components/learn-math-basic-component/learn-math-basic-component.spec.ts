import { newE2EPage } from '@stencil/core/testing';

describe('Testing Happy Paths for Math Basic component', () => {

    [
        '<learn-math-basic-component min=0 max=100 type="DIVIDE"></learn-math-basic-component>',
        '<learn-math-basic-component min=0 max=100 type="ADD"></learn-math-basic-component>',
        '<learn-math-basic-component min=0 max=100 type="MINUS"></learn-math-basic-component>',
        '<learn-math-basic-component min=0 max=100 type="MULTIPLY"></learn-math-basic-component>'
    ].forEach(item => {
        it('Test Render for all types', async () => {
            const page = await newE2EPage();

            await page.setContent(item);

            expect(await page.find('learn-math-basic-component')).toHaveClass('hydrated');
            expect(await page.find('learn-math-basic-component >>> div')).toHaveClass('container');

            const innerElements = await (await page.find('learn-math-basic-component >>> div')).findAll('div');
            expect(innerElements.length).toEqual(4);
            expect(innerElements[0]).toHaveClass('number1');
            expect(innerElements[1]).toHaveClass('number2');
            expect(innerElements[2]).toHaveClass('symbol');
            expect(innerElements[3]).toHaveClass('result');
        });

    });


    it('Test Values for ADD type', async () => {
        const page = await newE2EPage();

        await page.setContent('<learn-math-basic-component min=0 max=100 type="ADD"></learn-math-basic-component>');
        const innerElements = await (await page.find('learn-math-basic-component >>> div')).findAll('div');
        expect(innerElements.length).toEqual(4);

        expect(Number(innerElements[0].textContent)).toBeLessThanOrEqual(100);
        expect(Number(innerElements[0].textContent)).toBeGreaterThanOrEqual(0);

        expect(Number(innerElements[1].textContent)).toBeLessThanOrEqual(100);
        expect(Number(innerElements[1].textContent)).toBeGreaterThanOrEqual(0);

        expect(innerElements[2].textContent).toEqual('+');

        expect(Number(innerElements[3].textContent)).toEqual(Number(innerElements[0].textContent) + Number(innerElements[1].textContent));
    });


    it('Test Values for MINUS type', async () => {
        const page = await newE2EPage();

        await page.setContent('<learn-math-basic-component min=0 max=100 type="MINUS"></learn-math-basic-component>');
        const innerElements = await (await page.find('learn-math-basic-component >>> div')).findAll('div');
        expect(innerElements.length).toEqual(4);

        expect(Number(innerElements[0].textContent)).toBeLessThanOrEqual(100);
        expect(Number(innerElements[0].textContent)).toBeGreaterThanOrEqual(0);

        expect(Number(innerElements[1].textContent)).toBeLessThanOrEqual(Number(innerElements[0].textContent));
        expect(Number(innerElements[1].textContent)).toBeGreaterThanOrEqual(0);

        expect(innerElements[2].textContent).toEqual('-');

        expect(Number(innerElements[3].textContent)).toEqual(Number(innerElements[0].textContent) - Number(innerElements[1].textContent));
    });


    it('Test Values for MULTIPLY type', async () => {
        const page = await newE2EPage();

        await page.setContent('<learn-math-basic-component min=0 max=100 type="MULTIPLY"></learn-math-basic-component>');
        const innerElements = await (await page.find('learn-math-basic-component >>> div')).findAll('div');
        expect(innerElements.length).toEqual(4);

        expect(Number(innerElements[0].textContent)).toBeLessThanOrEqual(100);
        expect(Number(innerElements[0].textContent)).toBeGreaterThanOrEqual(0);

        expect(Number(innerElements[1].textContent)).toBeLessThanOrEqual(100);
        expect(Number(innerElements[1].textContent)).toBeGreaterThanOrEqual(0);

        expect(innerElements[2].textContent).toEqual('*');

        expect(Number(innerElements[3].textContent)).toEqual(Number(innerElements[0].textContent) * Number(innerElements[1].textContent));
    });


    it('Test Values for DIVIDE type', async () => {
        const page = await newE2EPage();

        await page.setContent('<learn-math-basic-component min=0 max=100 type="DIVIDE"></learn-math-basic-component>');
        const innerElements = await (await page.find('learn-math-basic-component >>> div')).findAll('div');
        expect(innerElements.length).toEqual(4);

        expect(Number(innerElements[0].textContent)).toBeLessThanOrEqual(100);
        expect(Number(innerElements[0].textContent)).toBeGreaterThanOrEqual(0);

        expect(Number(innerElements[1].textContent)).toBeLessThanOrEqual(Number(innerElements[0].textContent));
        expect(Number(innerElements[1].textContent)).toBeGreaterThanOrEqual(0);

        expect(innerElements[2].textContent).toEqual('/');

        expect(Number(innerElements[3].textContent)).toEqual(Number(innerElements[0].textContent) / Number(innerElements[1].textContent));
    });


});

describe('Testing Sad Paths for Math Basic component', () => {
    it('Test When invalid type is passed', async () => {
        const page = await newE2EPage();

        await page.setContent('<learn-math-basic-component min=0 max=100 type="DIVIE"></learn-math-basic-component>');
        const innerElements = await (await page.find('learn-math-basic-component >>> div'));
        expect(innerElements).toHaveClass('error');

        expect((await innerElements.find('h4')).textContent).toEqual('Errors!!');
    });

    it('Test When max is less then min value', async () => {
        const page = await newE2EPage();

        await page.setContent('<learn-math-basic-component min=100 max=10 type="ADD"></learn-math-basic-component>');
        const innerElements = await (await page.find('learn-math-basic-component >>> div'));
        expect(innerElements).toHaveClass('error');

        expect((await innerElements.find('h4')).textContent).toEqual('Errors!!');
    });
});