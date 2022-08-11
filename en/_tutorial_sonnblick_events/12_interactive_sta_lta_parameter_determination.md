---
title: "STA/LTA parameters"
layout: doc_chapter
subheadline: "Interactive determination of optimal STA/LTA parameters."
description: "Interactive determination of optimal STA/LTA parameters."
teaser: "The performance of the STA/LTA detection algorithm heavily depends on the chosen parameters. psysmon provides the possibility to visually check the effects of the parameters on the detection results. This can be done interactively using the original data which is intended to be used for the detection."
image_dir: tut_sbe/sta_lta_parameters

namespace: tut_sbe_sta_lta_parameters

type: chapter

permalink: sta_lta_parameters

figures:
    load-collection:
        label: fig:load-collection
        number: 1
        filename: screenshot_load_collection.png
        caption: Load an existing colleciton using the context menu in the collection listbox.
        
    select-display-collection:
        label: fig:select-display-collection
        number: 2
        filename: screenshot_select_display_collection.png
        caption: Select the display collection in the load collection dialog.
        
    tracedisplay-window:
        label: fig:tracedisplay-window
        number: 3
        filename: screenshot_tracedisplay_window.png
        caption: The tracedisplay window.
        
    tracedisplay-timerange-set:
        label: fig:tracedisplay-timerange-set
        number: 4
        filename: screenshot_tracedisplay_set_timerange.png
        caption: The tracedisplay window with the displayed start time and duration set.
        
    tracedisplay-stalta-detection:
        label: fig:tracedisplay-stalta-detection
        number: 5
        filename: screenshot_tracedisplay_stalta.png
        caption: The STA/LTA detection view activated and the STA/LTA detection preferences shown on the right side.
        
    tracedisplay-stalta-parameters-adjusted:
        label: fig:tracedisplay-stalta-parameters-adjusted
        number: 6
        filename: screenshot_tracedisplay_stalta_parameters_adjusted.png
        caption: The less sensitive detection with the adjusted parameters.
        
    tracedisplay-stalta-earthquake:
        label: fig:tracedisplay-stalta-earthquake
        number: 7
        filename: screenshot_tracedisplay_stalta_earthquake.png
        caption: The performance of the STA/LTA detection with an earthquake signal.
        
    tracedisplay-stalta-tweaked:
        label: fig:tracedisplay-stalta-tweaked
        number: 8
        filename: screenshot_tracedisplay_stalta_tweaked.png
        caption: The tweaked STA/LTA parameters to better detect the earthquake signal.
        
    tracedisplay-stalta-tweaked-check:
        label: fig:tracedisplay-stalta-tweaked-check
        number: 9
        filename: screenshot_tracedisplay_tweaked_check.png
        caption: Check of the detection result of the short signal using the new detection parameters.
        
---

When using the STA/LTA method for signal detection, a tuning of the detection parameters is needed. This tuning sometimes becomes a kind of magical process because the effects of changing a certain parameter is not always obviously reflected in the resulting detections. In psysmon, the impact of the parameter tuning can be interactively assessed using the tracedisplay. All relevant timeseries used in the STA/LTA detection can be visualized together with the seismograms or other views of the timeseries. This makes the adaption of the STA/LTA parameters to the custom needs much easier and transparent.

The STA/LTA algorithm implemented in psysmon basically follows the algorithm introduced by Rex Allen {% cite allen_automatic_1978 %} with some adaptions. For the computation of the stop value, a custom algorithm is used. After a valid signal detection, the effect of the signal on the LTA is removed to enable the detection of closely spaced events, which would otherwise be missed because the LTA is still high.

An introduction to tuning an STA/LTA trigger is given by Amadej Trnkoczy {% cite trnkoczy_understanding_2012 %} in the New Manual of Seismological Observatory Practice 2 (NMSOP-2) {% cite bormann_new_2012 %}.


## Open the display collection
Load the display collection that we have created when [screening the data][chap-screening].
Open the context menu of the collection listbox by clicking the right mouse button somewhere in the collection listbox. Select the menu entry `load collection` to open the load collection dialog.

{% include insert_image.html key="load-collection" %}

Select the `display` collection in the load collection dialog.

{% include insert_image.html key="select-display-collection" %}

The display collection be be loaded and shown in the collectin listbox.

## Open the tracedisplay window
The preferences of the tracedisplay collection node are stored in the collection. They should be the same as defined in the chapter about [screening the data][chap-screening]. Execute the collection using the `execute` button to open the tracedisplay window.

{% include insert_image.html key="tracedisplay-window" %}

## Set the display range
Use the datetime and duration controls to set the timerange to `2018-10-25 07:01:15.000000`. You should see a signla at station MOR.

{% include insert_image.html key="tracedisplay-timerange-set" %}

## Show the STA/LTA detection
Use the `CTRL+D` shortcut to show the STA/LTA detection view and the `ALT-D` shortcut to show the STA/LTA detection preferences. You can find descriptions of the parameters in their tooltips. To show a tooltip hover the mouse pointer over the desired parameter edit field.

Check if the default values in the opened preferences dialog fit the following parameters, adjust them if necessary.

| parameter            | value  |
|----------------------|--------|
| cf type              | square |
| STA length           | 1.0    |
| LTA length           | 5.0    |
| Threshold            | 3.0    |
| Fine threshold       | 2.0    |
| turn limit           | 0.05   |
| stop grow ratio      | 0.001  |
| stop grow exponent   | 1.0    |
| stop grow increase   | 0.001  |
| stop grow inc. begin | 10.0   |
| stop delay           | 0.1    |
| reject length        | 0.5    |


{% include insert_image.html key="tracedisplay-stalta-detection" %}

## The STA/LTA curves
The shown event on station MOR is a good example to explain the various lines shown in the STA/LTA detection view.

green line
: The threshold function (THRF), which is the long term average multiplied by the Threshold value.

blue line
: The short term average computed using the characteristic function (e.g. square) and the STA length. A signal start is declared when the STA goes above the threshold function.

dark red line
: The stop value. The stop value starts to grow according every time the STA falls below the THRF. It is reset when the STA goes above the THRF again. A signal end is declared when the STA falls below the stop value. How fast the stop value grows is determined by the parameters of the stop criterium section in the preferences.

orange line
: The threshold function cleaned from the effects of the detected signals.

vertical red line
: The start of a detected signal.

vertical blue line
: The end of a detected signal.

Change the parameters in the STA/LTA detection preferences panel to get a feeling how these parameters change the behaviour of the detection result. Once you are satisfied with the detection results, you can navigate through the data to check how the detector responds to other events or to random noise.

## Adjust the detection parameters
Increase the `LTA lenght` to 10.0 to let the THRF be less reactive to short-time amplitude changes. Change the `Threshold` to 5 to make the detector less sensitive to weak events. and set the `stop growth ratio` to 0.0001 to prevent a too fast spliting of signals with varying amplitude envelope. Use the `R` shortcut to refresh the views to make the changes visible. If the shortcut doesn't seem to work, click in the views area to reset the window focus. When editing preferences, the shortcuts are not active.

You should see, that the detection on station MIT vanished due to the increase of the threshold value and that the stop value grows more slowly.

{% include insert_image.html key="tracedisplay-stalta-parameters-adjusted" %}


## Performance with earthquke signal
The used STA/LTA detection values seem to fit quite good for the detection of short signals that we are looking for. To show the performance of these detection parameters for earthquake signals set the displayt timespan to 2018-10-25T22:52:00.000000 with a duration of 900 seconds.

{% include insert_image.html key="tracedisplay-stalta-earthquake" %}

You can see, that the signal is not detected as expected. The parameters which are good to detect short, maybe closely-spaced successive events is not performing well with long earthquake signals. To focus on the detection of earthquake signals, the parameter would have to be adjusted so that the individual phases of the earthquake are not split. Finding detection parameters that fit all types of input signals perfectly is not possible, because at some point in the detection process signal becomes noise and vice versa {% cite scales_what_1998 %}. Its important to know on which type of signal the focus lies and then find the best compromise to detect as many other signal types as possible without decreasing the detection performance for the wanted signal types.

# Tweaking the parameters
We will change some of the parameters to get a better detection of the earthquake signal. From the detection curves it can be seen, that the problem is the fast increasing stop value (dark red line) which triggers an early signal end. We will increase the LTA length to make react more slowly to short amplitude changes. And we will decrease the growing of the stop value by changing the `stop grow exponent`, the `stop grow increase` and the `stop grow inc. begin`. Furthermore we will add a 100 Hz lowpass filter using the `processing stack` to filter short-term signals. 

The new detection parameters are:

| parameter            | value  |
|----------------------|--------|
| cf type              | square |
| STA length           | 1.0    |
| LTA length           | 20.0   |
| Threshold            | 5.0    |
| Fine threshold       | 2.0    |
| turn limit           | 0.05   |
| stop grow ratio      | 0.0001 |
| stop grow exponent   | 0.9    |
| stop grow increase   | 0.0001 |
| stop grow inc. begin | 200.0  |
| stop delay           | 0.1    |
| reject length        | 0.5    |

{% include insert_image.html key="tracedisplay-stalta-tweaked" %}

The detection of the earthquake has significantly improved by covering the P- and S-phase signals into one detection. There are still quite many short detections after the earthquake, but this will most likely be ignored by the detection binding process.

Now check if the detection of the short signal has not been degraded.

{% include insert_image.html key="tracedisplay-stalta-tweaked-check" %}

The result is looking good. The parameters seem to be a good choice for our data and detection goal.


## References
{% bibliography --cited_in_order --bibliography_list_tag ol%}


[chap-screening]: {% link en/_tutorial_sonnblick_events/07_interactive_data_screening.md %}
