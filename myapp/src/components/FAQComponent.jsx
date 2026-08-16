import React from "react";
import "./faq.css";

const defaultFaqs = [
  {
    question: "What tolerances can you achieve with CNC machining?",
    answer:
      "We can achieve tolerances as tight as ±0.005mm for standard CNC machining operations.",
  },
  {
    question: "What is the typical lead time for CNC machined parts?",
    answer:
      "Typical lead time is 3–7 business days depending on complexity.",
  },
];

const FAQComponent = ({
  heading = "CNC Machining",
  subtitle = "Get answers to frequently asked questions about our services.",
  items = defaultFaqs,   // 👈 default value
}) => {
  return (
    <section className="py-5 faq-section">
      <div className="container">
        <div className="text-center mb-5">
          <span className="badge rounded-pill bg-warning text-dark px-3 py-2 Comman-Question">
            COMMON QUESTIONS
          </span>

          <h2 className="fw-bold mt-3 display-6">
            {heading} <span className="text-warning">FAQ</span>
          </h2>

          <p className="text-muted mt-2">{subtitle}</p>
        </div>

        <div className="accordion" id="faqAccordion">
          {items.map((faq, i) => (
            <div key={i} className="accordion-item border-0 shadow-sm mb-3 rounded-4">
              <h2 className="accordion-header">
                <button
                  className={`accordion-button ${i !== 0 ? "collapsed" : ""}`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#faq${i}`}
                >
                  {faq.question}
                </button>
              </h2>

              <div
                id={`faq${i}`}
                className={`accordion-collapse collapse ${i === 0 ? "show" : ""}`}
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body text-muted">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQComponent;
