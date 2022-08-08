---
title: "Probability Power Spectral Density"
layout: doc_chapter
subheadline: "Computation of the probability power spectral density."
description: "Computation of the probability power spectral density."
teaser: "The probability power spectral density is a tool that can be used to determine the data quality and eventual problems with the data recorder or the sensor. psysmon provides the tools to compute the probability power spectral density (PPSD) for the complete data set which then can be used to create the PPSD plots for the desired time spans."
image_dir: tut_sbe/ppsd_computation

namespace: tut_sbe_ppsd_computation

type: chapter

permalink: ppsd_computation

figures:

---

A standard procedure when analyzing the seismic data is to compute a spectrogram and the probability power spectral density (PPSD) of the recorded data {% cite mcnamara_ambient_2004 %}. This gives a good overview of the general behaviour of the ambient seismic noise and periods with changes in the frequency or amplitude characteristics can be easily identified. It also provides a good temporal compression without loosing significant information and large datasets can be screened very fast for phases of special interest.

The `compute PPSD` looper child node provides the computation of the PPSD images using the [obspy PPSD][obspy-ppsd]{:target="blank"} class.


## References
{% bibliography --cited_in_order --bibliography_list_tag ol%}


[obspy-ppsd]: https://docs.obspy.org/packages/autogen/obspy.signal.spectral_estimation.PPSD.html#obspy.signal.spectral_estimation.PPSD
