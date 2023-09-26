exports.RateCalculator = class RateCalculator{
    constructor(page){
        this.page = page
        this.ddlOrigin = page.getByLabel('Shipping From')
        this.ddlDestination = page.getByLabel('To')
        this.txtOriginZip = page.locator('[id="rates\\.inputs\\.origin-zip-code"]')
        this.txtDestinationZip = page.locator('[id="rates\\.inputs\\.destination-zip-code"]')
        this.txtWeight = page.getByLabel('Parcel Weight')
        this.ddlWeightUnit = page.locator('[id="rates\\.inputs\\.weight_unit"]')
        this.btnRefineSearch = page.getByText('Refine search')
        this.txtDimension1 = page.getByPlaceholder('0').nth(0)
        this.txtDimension2 = page.getByPlaceholder('0').nth(1)
        this.txtDimension3 = page.getByPlaceholder('0').nth(2)
        this.ddlDimensionUnit = page.locator('[id="rates\\.inputs\\.product-dimension_unit"]')
        this.ddlProductCategory = page.getByLabel('Product Category')
        this.btnCalculate = page.getByRole('button', { name: 'Calculate' })
        this.sectionResults = page.locator('.c-rate-calculator__body')
        this.tblResults = page.getByText('Total Cost')
    }
    async setDestination(origin, destination, originZip, destinationZip){
        await this.ddlOrigin.selectOption(origin);
        await this.ddlDestination.selectOption(destination);
        const isOriginZipVisible = await this.txtOriginZip.isVisible();
        const isDestinationZipVisible = await this.txtDestinationZip.isVisible();
        if (isOriginZipVisible){
            await this.txtOriginZip.fill(originZip)
        }
        if (isDestinationZipVisible){
            await this.txtDestinationZip.fill(destinationZip)
        }
    }

    async enterWeight(unit, weight){
        await this.ddlWeightUnit.selectOption(unit);
        await this.txtWeight.fill(weight);
    }

    async enterDimensions(unit, d1, d2, d3){
        await this.ddlDimensionUnit.selectOption(unit);
        await this.txtDimension1.fill(d1);
        await this.txtDimension2.fill(d2);
        await this.txtDimension3.fill(d3);
    }

    async selectProductCategory(category){
        await this.ddlProductCategory.selectOption(category);
    }

    async RefineSearch(){
        await this.btnRefineSearch.click();
    }

    async Calculate(){
        await this.btnCalculate.click();
    }

    async CheckTable(){
        await this.sectionResults.scrollIntoViewIfNeeded();
    }
}