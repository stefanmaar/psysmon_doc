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
        
    tracedisplay-shortcuts:
        label: fig:tracedisplay-shortcuts
        number: 7
        filename: screenshot_tracedisplay_shortcuts.png
        caption: The shortcuts are listed besides the related menu entries.
        
    tracedisplay-open-preferences:
        label: fig:tracedisplay-open-preferences
        number: 8
        filename: screenshot_tracedisplay_open_preferences.png
        caption: Open the spectrogram view preferences using the related submenu in the View menu.
        
    tracedisplay-spectrogram-preferences:
        label: fig:tracedisplay-spectrogram-preferences
        number: 9
        filename: screenshot_tracedisplay_spectrogram_preferences.png
        caption: The spectrogram preferences are opened as a docking window on the right side of the tracedisplay main window.
        
    tracedisplay-spectrogram-preferences-maximized:
        label: fig:tracedisplay-spectrogram-preferences-maximized
        number: 10
        filename: screenshot_tracedisplay_spectrogram_preferences_maximized.png
        caption: The maximized spectrogram preferences docking frame.
        
    tracedisplay-spectrogram-preferences-docked-top:
        label: fig:tracedisplay-spectrogram-preferences-docked-top
        number: 11
        filename: screenshot_tracedisplay_spectrogram_preferences_docked_top.png
        caption: The spectrogram preferences docked to the top of the tracedisplay window.
        
    tracedisplay-refresh:
        label: fig:tracedisplay-refresh
        number: 12
        filename: screenshot_tracedisplay_refresh.png
        caption: Apply the changes of the spectrogram view preferences using the refresh menu.
        
    tracedisplay-spectrogram-plasma:
        label: fig:tracedisplay-spectrogram-plasma
        number: 13
        filename: screenshot_tracedisplay_spectrogram_plasma.png
        caption: The spectrogram view with the changed colormap and overlap.
        
    tracedisplay-processing-stack:
        label: fig:tracedisplay-processing-stack
        number: 14
        filename: screenshot_tracedisplay_processing_stack.png
        caption: The processing stack opened in a docking frame of the tracedisplay window.
        
    tracedisplay-ps-add-node:
        label: fig:tracedisplay-ps-add-node
        number: 15
        filename: screenshot_tracedisplay_ps_add.png
        caption: Adding the lowpass filter processing node using the processing node selection dialog.
        
    tracedisplay-ps-node-added:
        label: fig:tracedisplay-ps-node-added
        number: 16
        filename: screenshot_tracedisplay_ps_node_added.png
        caption: The lowpass filter processing node added to the processing stack.
        
    tracedisplay-ps-lowpass-applied:
        label: fig:tracedisplay-ps-lowpass-applied
        number: 17
        filename: screenshot_tracedisplay_ps_lowpass_applied.png
        caption: The lowpass filter applied to the data.
        
---
The interactive screening of a dataset is a main application of psysmon. The dataset can be examined using various visualization techniques (e.g. seismogram, spectrogram) and custom visualization plugins can be added easily. This enables the test of new algorithms or processing methods on a complete real-world data set.


## Create the display collection
Create a collection named *display* and add the collection node `tracedisplay` to the collection.

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

You can use the datetime and duration edit fields on top of the tracedisplay window (just below the menu bar) to select a time range to display.

## Using shortcuts
The tracedisplay dialog provides shortcuts for frequently used commands and options. The shortcuts are listend besides the menu entries in the submenus of the menu bar. For example, use `CTRL+E` to toggle the spectrogram view.

{% include insert_image.html key="tracedisplay-shortcuts" %}

## Plugin preferences
The views, tools and commands available via the tracedisplay menu bar are created by plugins. Each plugin has the option to provide preferences which can be accessed using the `Preferences` submenu in the tracedisplay menu bar. For example, to open the preferences of the spectrogram view, select the menu `View->Preferences->Spectrogram` (or use the shortcut `ALT-E`).

{% include insert_image.html key="tracedisplay-open-preferences" %}

The preferences of the spectrogram view will open as a docking frame on the right side of the tracedisplay window. 

{% include insert_image.html key="tracedisplay-spectrogram-preferences" %}

You can toggle the preferences docking frame using the preferences menu entry (e.g. `View->Preferences->Spectrogram`) or the related shortcut (e.g. `ALT-E`). You can also close it using the close button on the top right of the preferences docking frame. There you also have a maximize button which you can use to maximize the docking frame for a better accesibility of the preference items.

{%include insert_image.html key="tracedisplay-spectrogram-preferences-maximized" %}

You can resize the docking frame by click-and-drag of the border between the preferences docking frame and the tracedisplay view frame. The tracedisplay view frame is the part of the tracedisplay window showing the seismograms and spectrograms.

You also have the option to click and drage the preferences docking frame using its title bar. This will undock the preferences frame from the tracedisplay window. You can use it as a separate window on your display or dock it at another position to the tracedisplay window.

{% include insert_image.html key="tracedisplay-spectrogram-preferences-docked-top" %}


## Applying plugin preference changes
Use the editable preference elements in the preferences docking frame to change the settings of the plugin. In this example, I will change the `overlap` to 0.95 and the `colormap` to plasma. The changes will not be applied automatically. You have to refresh the views by using the `Control->refresh views` menu or the shortcut `R`.

{% include insert_image.html key="tracedisplay-refresh" %}

The spectrogram views should be changed after refreshing the display.

{% include insert_image.html key="tracedisplay-spectrogram-plasma" %}


## The processing stack
The processing stack provides the possibility to add signal processing algorithms (e.g. detrending or frequency filtering) to the data before it is displayed. Close the spectrogram preferences (shortcut `ALT-E`) and open the processing stack (shortcut `CTRL+P`). The processing stack will be shown in a docking frame on the right side of the tracedisplay window.

{% include insert_image.html key="tracedisplay-processing-stack" %}

In the processing stack you can add processing nodes similar to collection nodes in a psysmon collection. The nodes in the processing stack will be applied to the original data from top to bottom. By default, the `detrend` processing node is activated. Each processing node provides preferences that can be edited below the processing stack node listbox.

## Adding processing nodes
Click the `add` button in the processing stack docking frame. The processing nodes selection dialog will appear. Select the `lowpass filter` processing node in this dialog and click the `OK` button.

{% include insert_image.html key="tracedisplay-ps-add-node" %}

The `lowpass filter` processing node will appear in the processing stack below the `detrend` node. Select the `lowpass filter` node in the processing stack node listbox to open the preferences below the listbox. Change the `frequ.` parameter to `100`.

{% include insert_image.html key="tracedisplay-ps-node-added" %}

To apply the changed processing stack to the data, either click the `run` button in the processing stack docking frame or refresh the tracedisplay views using the shortcut `R`.

The tracedisplay view is updated showing the data with the 100 Hz lowpass filter applied.

{% include insert_image.html key="tracedisplay-ps-lowpass-applied" %}
