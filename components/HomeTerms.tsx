import { formatMoney } from "@/lib/format";
import type { Home } from "@/lib/homes";

export function HomeTerms({ home }: { home: Home }) {
  const options = home.paymentOptions;
  if (!options?.length) return null;

  const county = home.county ?? "the county";
  const yearlyTax = home.annualPropertyTax ? formatMoney(home.annualPropertyTax) : null;
  const monthlyTax = formatMoney(options[0].propertyTax);

  return (
    <section className="terms" aria-labelledby="terms-heading">
      <h2 id="terms-heading">Owner financing for this home</h2>
      <p>
        Seller financing is available. Choose the payment that fits your budget. Every option uses
        the same purchase price, the same down payment, and the same interest rate. A shorter term
        means a slightly higher payment, and you own the home sooner.
      </p>
      <dl className="facts">
        <div className="fact">
          <dt>Purchase price</dt>
          <dd>{formatMoney(home.purchasePrice)}</dd>
        </div>
        <div className="fact">
          <dt>Down payment</dt>
          <dd>
            {formatMoney(home.downPayment)}
            <small>Credited toward the price</small>
          </dd>
        </div>
        {home.amountFinanced ? (
          <div className="fact">
            <dt>Amount financed</dt>
            <dd>{formatMoney(home.amountFinanced)}</dd>
          </div>
        ) : null}
        {home.interestRate ? (
          <div className="fact">
            <dt>Annual interest rate</dt>
            <dd>{home.interestRate}</dd>
          </div>
        ) : null}
      </dl>

      <h3>Payment options</h3>
      <div className="pay-scroll">
        <table className="pay-table">
          <caption>
            Three ways to pay. The lowest total today is {formatMoney(options[0].total)} a month, on
            the {options[0].label.toLowerCase()} option.
          </caption>
          <thead>
            <tr>
              <th scope="col">
                <span className="sr-only">What the row shows</span>
              </th>
              {options.map((option) => (
                <th key={option.label} scope="col">
                  {option.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Number of monthly payments</th>
              {options.map((option) => (
                <td key={option.label}>{option.payments}</td>
              ))}
            </tr>
            <tr>
              <th scope="row">Principal and interest</th>
              {options.map((option) => (
                <td key={option.label}>{formatMoney(option.principalAndInterest)}</td>
              ))}
            </tr>
            <tr>
              <th scope="row">Property tax</th>
              {options.map((option) => (
                <td key={option.label}>{formatMoney(option.propertyTax)}</td>
              ))}
            </tr>
            <tr className="pay-total">
              <th scope="row">Total each month</th>
              {options.map((option) => (
                <td key={option.label}>{formatMoney(option.total)}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <h3>About the monthly payment</h3>
      <ul className="term-notes">
        <li>
          Principal and interest stays the same for the full term of the option you choose.
        </li>
        <li>
          The property tax portion is collected each month and paid to {county} by the seller.
          {yearlyTax ? ` It is based on current taxes of ${yearlyTax} a year` : " It is based on the current tax bill"}{" "}
          ({monthlyTax} a month) and is adjusted every year to match the actual tax bill. When
          property taxes go up, the total monthly payment goes up with them.
        </li>
        <li>
          You carry your own insurance on the home. Insurance is not part of the monthly payment.
        </li>
        <li>
          You handle the costs of living there: all utilities, routine maintenance, lawn care, and
          upkeep, plus repair and replacement of the home&apos;s systems, including the roof,
          plumbing, electrical, and heating and cooling.
        </li>
        <li>
          The home is sold as-is. We encourage you to have a qualified professional inspect it
          before you sign.
        </li>
        <li>
          This summary is information only. It is not a purchase contract, and it does not replace
          the signed agreement or the required disclosures.
        </li>
      </ul>
      {home.summaryPdf ? (
        <p>
          <a className="summary-link" href={home.summaryPdf} download>
            Purchase summary (PDF)
          </a>
        </p>
      ) : null}
    </section>
  );
}
