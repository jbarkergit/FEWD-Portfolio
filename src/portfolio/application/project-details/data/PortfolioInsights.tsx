const PortfolioInsights = () => {
  return (
    <>
      <h2>An Application Hub with Seamless Transitions</h2>
      <p>
        The primary goal of this portfolio was to craft an intuitive environment tailored for talent acquisition. However, achieving such simplicity presented
        challenges, especially in dealing with routing intricacies and optimizing Web Core Vital metrics. What initially appeared as an unassuming design unfolded
        into a thoughtful and time-consuming process.
      </p>

      <h3>Prioritizing Landing Page Imports</h3>
      <p>
        The first strategy involved prioritizing each project's landing page and lazy loading corresponding pages to optimize the largest contentful paint and time
        to interact. While this standard approach seemed promising, testing revealed issues with cumulative layout shift and delayed font displays, prompting a
        reconsideration of the routing strategy, especially considering the application's future scalability.
      </p>

      <h3>Analyzing the Network</h3>
      <p>
        Utilizing the Network developer tool became crucial for visualizing file sizes, transfer times, and the queue. To create a module loading queue, I
        dynamically generated routes and spread them in state. Challenges arose, particularly with the 404 protocol error handler loading before the requested page.
        Attempting to address this led to a somewhat hacky solution involving dismissing the handler, mounting an Observer to the Network, and prop drilling data to
        the Suspense loader just to prompt the user that the requested page couldn't be found.
      </p>

      <h3>Custom Router</h3>
      <p>
        Navigating into the realm of custom Router development raised questions about the need for such intricacies. After careful consideration, I realized I hadn't
        exhausted all solutions. Manually routing paths and dynamically loading only the necessary modules would solve cumulative layout shift and protocol handler
        issues without adding complexity. This approach would also offer flexibility as the application scaled.
      </p>

      <h3>Conclusion</h3>
      <p>
        Following this evaluation and implementation, I streamlined logic, even reducing variable memory caching, to reduce web core vital metrics. Accepting a
        minuscule performance impact on initial load, the trade-off would be a synchronous background queue and seamless page transitions. While I do intend on
        revisiting a more custom solution, the current solution is satisfactory enough.
      </p>
    </>
  );
};
export default PortfolioInsights;
