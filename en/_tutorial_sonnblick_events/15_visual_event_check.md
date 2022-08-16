---
title: "Visual event check"
layout: doc_chapter
subheadline: "Checking the detected events in tracedisplay."
description: "Checking the detected events in tracedisplay."
teaser: "Tracedisplay can be used to acces the events in the database and visualize the related data.."
image_dir: tut_sbe/visual_event_check

namespace: tut_sbe_visual_event_check

type: chapter

permalink: visual_event_check/

figures:
    tracedisplay-preferences:
        label: fig:tracedisplay-preferences
        number: 1
        filename: screenshot_tracedisplay_preferences.png
        caption: The tracedisplay preferences with the stations selected for the event detection.
        
    tracedisplay:
        label: fig:tracedisplay
        number: 2
        filename: screenshot_tracedisplay.png
        caption: The tracedisplay window with the 4 selected stations.
        
    tracedisplay-event-selector:
        label: fig:tracedisplay-event-selector
        number: 3
        filename: screenshot_tracedisplay_event_selector.png
        caption: The event selector opens as a docking frame in the tracedisplay window.
        
    tracedisplay-events-loaded:
        label: fig:tracedisplay-events-loaded
        number: 4
        filename: screenshot_tracedisplay_events_loaded.png
        caption: The events loaded for the day 2018-10-25.
        
    tracedisplay-earthquake-event:
        label: fig:tracedisplay-earthquake-event
        number: 5
        filename: screenshot_tracedisplay_earthquake_event.png
        caption: The selected event shown in the tracedisplay. It is the earthquake that already was discussed when tuning the detection parameters.
        
    tracedisplay-example-event:
        label: fig:tracedisplay-example-event
        number: 6
        filename: screenshot_tracedisplay_example_event.png
        caption: Another example event shown in the tracedisplay window.
        
    tracedisplay-example-event-mor:
        label: fig:tracedisplay-example-event-mor
        number: 7
        filename: screenshot_tracedisplay_example_event_mor.png
        caption: The stations of array MOR shown using the station selector plugin.
        
    tracedisplay-example-event-measure:
        label: fig:tracedisplay-example-event-measure
        number: 8
        filename: screenshot_tracedisplay_example_event_measure.png
        caption: Measure the arrival time differences of the example event. The measured data values are shown in the view annotation panel.
        
---
The `tracedisplay` can be used to navigate the events saved in the psysmon database.

## Open the tracedisplay dialog
Load the `display` collection and open the `tracedisplay` preferences. Select the stations that have been used for the detection binding (MIT:XX:A, MOR:XX:A, PIL:XX:A and STO:XX:00). 

{% include insert_image.html key="tracedisplay-preferences" %}

Close the preferences dialog and execute the `display` collection to open the tracedisplay window. The tracedisplay window should show the seismograms of the 4 selected stations.

{% include insert_image.html key="tracedisplay" %}

## Open the event selector
The events can be browsed using the event selector plugin. Open it using the menu `Display->show events`. The event selector will open as a docking frame on the right side of the tracedisplay window. Resize it to better see the available parameters.

{% include insert_image.html key="tracedisplay-event-selector" %}

## Load the events
In the event selector the events for a given time span can be loaded from an event catalog. Select 2018-10-25T00:00:00 for the `start time` and a `window length` of 86400 seconds. Select the event catalog tutorial and click the `load events` button. This will load all events detected on the day 2018-10-25. The events will be listed in the `events` table.

{% include insert_image.html key="tracedisplay-events-loaded" %}

## Select an event
Select the event with id 32 and start time 2018-10-25T22:57:31.938750. The time span of the displayed data will be changed to the event limits of the selected event. Zoom out to better show the event (click with the mouse into a seismogram view and use the shortcut `-` to zoom out).

{% include insert_image.html key="tracedisplay-earthquake-event" %}

The grey area marks the time limits of the detected event and the light read areas highlight the detections on the individual traces.

You can use the arrow keys in the events table of the event selector to browse through the detected events.

## Another event example
Another interesting event is the event with the start time 2018-10-26T01:40:17. To view this event change the `start time` in the event selector to 2018-10-26T00:00:00 and click the `load events` button to reload the events. The select the event with id 60 and start time 2018-10-26T01:40:17.041250 to show the event data.

{% include insert_image.html key="tracedisplay-example-event" %}

This event is an interesting event recorded on the arrays MOR and PIL. To investigate the event on one array, open the station selector plugin by clicking the menu `Display->select station` and then selecting the stations MOR:XX:A, MOR:XX:B and MOR:XX:C in the event selector docking frame. Resize the docking frame to create more space for the data views.

{% include insert_image.html key="tracedisplay-example-event-mor" %}

This events looks like a rockfall candidate. Zoom in using the `+` key and navigate to the onset of the second, stronger signal of the event. One can see the differences of the arrival times of the waveform at the three array locations. Use the measure tool (shortcut `M` of menu `Tools->measure point`) to better highlight the time differences. Click and drag the mouse in the seismogram view to move the measure pointer. The data values are plotted in the view annotation area on the right side of the views.

{% include insert_image.html key="tracedisplay-example-event-measure" %}






