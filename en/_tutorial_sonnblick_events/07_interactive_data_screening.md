---
title: "Data screening"
layout: doc_chapter
subheadline: "Interactive screening of the imported data."
description: "Interactive screening of the imported data."
teaser: "With psysmon it is easy to interactively screen through the seismic dataset. Doing this gives a first overview of the data quality and eventual seismic events."
image_dir: tut_sbe/data_screening

namespace: tut_sbe_data_screening

type: chapter

permalink: data_screening

figures:
    display-collection:
        label: fig:display-collection
        number: 1
        filename: screenshot_display_collection.png
        caption: The display collection with the tracedisplay collection node.
        
    edit-tracedisplay-node:
        label: fig:edit-tracedisplay-node
        number: 2
        filename: screenshot_edit_tracedisplay_node.png
        caption: Open the tracedisplay preferences dialog using the context menu.
        
    tracedisplay-preferences:
        label: fig:tracedisplay-preferences
        number: 3
        filename: screenshot_tracedisplay_preferences.png
        caption: The tracedisplay preferences dialog with the set parameters.
        
    tracedisplay-initial:
        label: fig:tracedisplay-initial
        number: 4
        filename: screenshot_tracedisplay_initial.png
        caption: The inital view of tracedisplay after the opening of the tracedisplay dialog. The display of the seismograms might be wrong because of an issue with the initial resizing of the window. You can fix the problem by refreshing the view using the key r.
        
    tracedisplay-initial-refresh:
        label: fig:tracedisplay-initial-refresh
        number: 5
        filename: screenshot_tracedisplay_initial_refresh.png
        caption: The initial view of tracedisplay after refreshing the view.
        
    tracedisplay-spectrogram-view:
        label: fig:tracedisplay-spectrogram-view
        number: 6
        filename: screenshot_tracedisplay_spectrogram_view.png
        caption: The tracedisplay dialog with the spectrogram view added.
        
        
---
The interactive screening of a dataset is a main application of psysmon. The dataset can be examined using various visualization techniques (e.g. seismogram, spectrogram) and custom visualization plugins can be added easily. This enables the test of new algorithms or processing methods on a complete real-world data set.


## Create the display collection
Create a collectin named *display* and add the collectionnode `tracedisplay` to the collection.

{% include insert_image.html key="display-collection" %}

## Edit the tracedisplay preferences
Open the `tracedisplay` preferences dialog using the context menu in the collection listbox.

{% include insert_image.html key="edit-tracedisplay-node" %}

The preferences dialog will appear. Select the following preferences:

start time
: 2018-10-25T00:00:00

duration
: 300

display mode
: network

stations
: MIT:XX:A, MOR:XX:A (hold the `CTRL` key to select multiple single stations, 'SHIFT' for a range)

array
: This field is disabled

channels
: DPZ

sort station
: by name

{% include insert_image.html key="tracedisplay-preferences" %}


## Execute the collection
Execute the `display` collection by clicking the `execute` button. The `tracedisplay` dialog will appear. The initial view shows the seismograms of the selected channesl. It might happen, that the first view shows a strange zig-zag pattern. This is because of an issue with the first resizing of the dialog window. You can fix this problem by refreshing the display using the menu `Control->refresh views` or by using the shortcut key `r`.

{% include insert_image.html key="tracedisplay-initial" %}

{% include insert_image.html key="tracedisplay-initial-refresh" %}


## Add the spectrogram view
For each channel you can add different views. The seismogram view is the default view. Add the spectrogram view of the data using the menu `View->spectrogram` or by pressing the shortcut key `CTRL+E`.

{% include insert_image.html key="tracedisplay-spectrogram-view" %}

## Navigate through the data
You can shift the displayed data in time by using the `left` and `right` arrow keys. Using the accelerators `SHIFT`, `CTRL` or `ALT` while pressing one of the arrow keys decreases the shifted time step.

You can use the `+` and `-` keys to zoom in or out of the data. Again using the accelerator keys `SHIFT`, `CTRL` or `ALT` while pressing one of the zoom keys decreases the zoom step.


