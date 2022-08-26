---
title: "Import data files"
layout: doc_chapter
subheadline: "Read miniseed data files into the database."
description: "Read miniseed data files into the database."
teaser: "To work with seismic data, the data files have to be imported into the psysmon database first."
image_dir: tut_sbe/import_data

namespace: tut_sbe_import_data

type: chapter

permalink: import_data/

figures:
    open-recent-project:
        label: fig:open-recent-project
        number: 1
        filename: screenshot_open_recent_project.png
        caption: Open a recent project using the File menu.
        
    waveclient-editor:
        label: "fig:waveclient-editor"
        number: 2
        filename: screenshot_waveclient_editor.png
        caption: "The waveclient editor showing the default database client."
        
    waveclient-options:
        label: "fig:waveclient-options"
        number: 3
        filename: screenshot_waveclient_options.png
        caption: The options of the db client waveclient.
        
    add-waveform-directory:
        label: "fig:add-waveform-directory"
        number: 4
        filename: screenshot_add_waveform_directory.png
        caption: Enter the properties of the waveform directory. The waveform directory points to the base path holding the data files. The file extension sets the search wildcards when scanning the waveform directory for data files.
        
    waveclient-options-with-waveform-directory:
        label: fig:waveclient-options-with-waveform-directory
        number: 5
        filename: screenshot_waveclient_options_with_waveform_directory.png
        caption: The waveclient options with the added waveform directory.
        
    waveclient-options-with-description:
        label: fig:waveclient-options-with-description
        number: 6
        filename: screenshot_waveclient_options_with_description.png
        caption: The waveclient options with the description.
        
    waveclient-editor-with-description:
        label: fig:waveclient-editor-with-description
        number: 7
        filename: screenshot_waveclient_editor_with_description.png
        caption: The waveclient editor with the changed custom description.
        
    data-import-collection:
        label: fig:data-import-collection
        number: 8
        filename: screenshot_data_import_collection.png
        caption: The data import collection with the import filesystem data collection node.
        
    open-import-data-preferences:
        label: fig:open-import-data-preferences
        number: 9
        filename: screenshot_open_import_data_preferences.png
        caption: Open the preferences dialog of the import filesystem data node using the context menu in the collection listbox.
        
    set-import-data-preferences:
        label: fig:set-import-data-preferences
        number: 10
        filename: screenshot_set_import_data_preferences.png
        caption: Select the available waveform directory and close the preferences dialog by clicking the OK button.
        
    check-collection-process:
        label: fig:check-collection-process
        number: 11
        filename: screenshot_check_collection_process.png
        caption: The status of the collection execution processes is shown in the processes tab in the log area at the bottom of the psysmon main window.
        
    view-log-file:
        label: fig:view-log-file
        number: 12
        filename: screenshot_view_log_file.png
        caption: To view the collection execution process log file, select the process in the processes tab in the log area and select the view log file menu entry of the context menu.
---
psysmon supports various data sources named waveclients (e.g. local file storage, seedlink server). For this tutorial we will use the default database client working with data files stored on the local file storage. 

To work with timeseris data file, the root directories containing the data files need to be configured. These root directories are named waveform directories. This has to be done to cope with eventual changes of the root directory names (e.g. when moving the data files to another filesystem or when working with remote data directories, where the name of the mount points might change).

The default waveclient is a database client which works with data files available on the local filesystem. The database client indexes the data files by importing the header data into the psysmon database. The filepaths are stored as paths relative to the waveform directory from which the data was imported.

## Reopen a project
At this point I introduce the opening of an existing psysmon project. If open, close the psysmon main window by clicking the menu entry `File->Exit`. Restart psysmon to reopen the psysmon main window. To open an existing psysmon project one can click the menu entry `File->Open project` and navigate to the desired psysmon project file (file ending ppr), or one can select a recently opened project file in the submenu `File->Open recent`. The psysmon project file is located in the project directory created during project creation (see section [Project creation][chap-project-directory]).

{% include insert_image.html key="open-recent-project" %}

A dialog asking for the user and password will open. Enter the database user name and the related password that was used when [setting up the database][chap-setting-up-the-database]. Click the `OK` button. The psysmon project will be loaded in the psysmon main window.

## Configure the data source

### Open the waveclient editor
Click the menu entry `Project->Data sources` to open the waveclient editor. The editor shows the default database waveclient named *db client*. 

{% include insert_image.html key="waveclient-editor" %}

### Edit the waveclient options
Select the *db client* and click the `edit` button. The wavelient options dialog will open.

{% include insert_image.html key="waveclient-options" %}

Next add the waveform directory pointing to the base of the directory of the miniseed files of the tutorial data set. To add a waveform directory click the `add` button on the right of the waveclient options dialog. The *edit waveform directory* dialog will open, where the properties of the waveform directory can be entered.

{% include insert_image.html key="add-waveform-directory" %}

waveform directory
: The base path of the data files. For the tutorial data set, the directory holding the year folder is used. It is assumed, that the directory structure below the waveform directory stays unchanged. Use the `Browse` button to navigate to the directory in your filesystem or directly type the path into the edit field. I'm using the path `/home/stefan/tutorial/dataset/mseed`.

description
: A custom description of the waveform directory. I'm using *The tutorial data set miniseed base directory.*.

file extension
: The file extension sets the search wildcards when scanning the waveform directory for data files. I'm using the default values **.msd, *.mseed*.

Confirm the properties by clicking the 'OK' button. The *edit waveform directory* dialog closes and the waveform directory appears in the *Edit the waveclient options* dialog.

{% include insert_image.html key="waveclient-options-with-waveform-directory" %}

Finally add the description *"The default database client."* for the waveclient.

{% include insert_image.html key="waveclient-options-with-description" %}

Confirm the changes by clicking the `OK` button. The dialog will close.

### Close the waveclient editor
The waveclient editor should now show ht *db client* with the custom description.

{% include insert_image.html key="waveclient-editor-with-description" %}

Close the waveclient editor by clicking the `OK` button.

### Save the project
Save the project by clicking the menu entry `File->Save project` in the psysmon main window.

The configuration of the data sources is finished. The next step is importing the data files into the database.


## Create the data import collection
Create a new collection named *data import* using the context menu in the collection listbox. Add the collection node `import filesystem data` to the collection.  I will not explain repeating tasks in detail. If you need to recap how to create a new collection and add a collection node, follow the steps described in chapter [Import geometry file][chap-import-geometry-file].

Your collection with the added collection node should look like the following screenshot.

{% include insert_image.html key="data-import-collection" %}

## Edit the import filesystem data parameters
The `import filesystem data` collection node provides a dialog for editing parameters before executing the node. To open the parameter edit dialog of the collection node, select the collection node in the collection listbox, open the context menu by clicking the right mouse button and select the menu entry `edit node`.

{% include insert_image.html key="open-import-data-preferences" %}

The preferences dialog of the selected collection node will open. The waveform directory listbox should show the waveform directory that you have created following the steps above. Select this waveform directory with *db_id* 1 so that it is highlighted. Leave all other parameters in the dialog unchanged. Click the `OK` button to confirm the selection.

{% include insert_image.html key="set-import-data-preferences" %}

## Execute the collection
Click the `Execute` button to run the `data import` collection. The import of the 7 days of the tutorial dataset might take some time depending on the used computer and the current load on your system. On my system it took ca. 6 minutes to complete the task. Executing a collection will create a new Linux process to run the collection nodes of a collection. The processes are detached from the psysmon main window. Closing the psysmon main window will not stop the execution of the collection node.

This feature allows executing multiple collections in parallel. 

## Checking the collection process
The status of the collection execution process can be checked in the `log area` at the bottom of the psysmon main window. To show the running processes select the `processes` tab in the log area. After starting the execution of the `data import` collection, the related process should appear in the `processes` tab of the log area.

{% include insert_image.html key="check-collection-process" %}

## Checking the collection execution log
Each collection excecution process writes status messages to a log file. The log files are saved in the `log` directory of the psysmon project base directory (e.g. `/home/stefan/tutorial/psysmon_projects/tutorial/log`). The base directory hase been specified when creating the project.

The log files of collections can also be accessed from the processes tab in the log area of the psysmon main window. Select the desired process and click the menu entry `View log file` in the context menu. The context menu can be opened using the right mouse button.

{% include insert_image.html key="view-log-file" %}


The content of the log file of the `data import` collection should look like the following listing.

~~~log
#LOG# - 2022-08-02 18:41:49,182 - INFO - psysmon: Starting process data import_20220802_184147_595587
#LOG# - 2022-08-02 18:41:49,182 - INFO - psysmon: Loading data from file /home/stefan/tutorial/psysmon_projects/tutorial/tmp/data import_20220802_184147_595587.ced
#LOG# - 2022-08-02 18:41:49,182 - INFO - psysmon: Project: <psysmon.core.project.Project object at 0x7fd4b168d5b0>
#LOG# - 2022-08-02 18:41:49,182 - INFO - psysmon: Collection: <psysmon.core.base.Collection object at 0x7fd4a4f8c880>
#LOG# - 2022-08-02 18:41:49,182 - INFO - psysmon: Executing collection <psysmon.core.base.Collection object at 0x7fd4a4f8c880> of project <psysmon.core.project.Project object at 0x7fd4b168d5b0>.
#LOG# - 2022-08-02 18:41:49,362 - INFO - psysmon.core.project.Project: example: databaseFactory found. Retrieving the table definitions.
#LOG# - 2022-08-02 18:41:49,365 - INFO - psysmon.core.project.Project: geometry: databaseFactory found. Retrieving the table definitions.
#LOG# - 2022-08-02 18:41:49,436 - INFO - psysmon.core.project.Project: obspyImportWaveform: databaseFactory found. Retrieving the table definitions.
#LOG# - 2022-08-02 18:41:49,442 - INFO - psysmon.core.project.Project: event: databaseFactory found. Retrieving the table definitions.
#LOG# - 2022-08-02 18:41:49,450 - INFO - psysmon.core.project.Project: pick: databaseFactory found. Retrieving the table definitions.
#LOG# - 2022-08-02 18:41:49,605 - INFO - psysmon: The collection settings used:
#DET# - 2022-08-02 18:41:49,605 - INFO - psysmon: { 'data import': { 'nodes': { 1: { 'import filesystem data': { 'enabled': True,
#DET# - 2022-08-02 18:41:49,605 - INFO - psysmon:                                                                'preferences': { 'Select': { 'import options': { 'import_new_only': True,
#DET# - 2022-08-02 18:41:49,605 - INFO - psysmon:                                                                                                                 'restrict_search_path': False,
#DET# - 2022-08-02 18:41:49,605 - INFO - psysmon:                                                                                                                 'search_path': ''},
#DET# - 2022-08-02 18:41:49,605 - INFO - psysmon:                                                                                             'waveform directory': { 'waveclient': 'db '
#DET# - 2022-08-02 18:41:49,605 - INFO - psysmon:                                                                                                                                   'client',
#DET# - 2022-08-02 18:41:49,605 - INFO - psysmon:                                                                                                                     'wf_dir': [ [ 1,
#DET# - 2022-08-02 18:41:49,605 - INFO - psysmon:                                                                                                                                   'db '
#DET# - 2022-08-02 18:41:49,605 - INFO - psysmon:                                                                                                                                   'client',
#DET# - 2022-08-02 18:41:49,605 - INFO - psysmon:                                                                                                                                   '/home/stefan/tutorial/dataset/mseed',
#DET# - 2022-08-02 18:41:49,605 - INFO - psysmon:                                                                                                                                   '/home/stefan/tutorial/dataset/mseed',
#DET# - 2022-08-02 18:41:49,605 - INFO - psysmon:                                                                                                                                   'The '
#DET# - 2022-08-02 18:41:49,605 - INFO - psysmon:                                                                                                                                   'tutorial '
#DET# - 2022-08-02 18:41:49,605 - INFO - psysmon:                                                                                                                                   'data '
#DET# - 2022-08-02 18:41:49,605 - INFO - psysmon:                                                                                                                                   'set '
#DET# - 2022-08-02 18:41:49,605 - INFO - psysmon:                                                                                                                                   'miniseed '
#DET# - 2022-08-02 18:41:49,605 - INFO - psysmon:                                                                                                                                   'base '
#DET# - 2022-08-02 18:41:49,605 - INFO - psysmon:                                                                                                                                   'directory.',
#DET# - 2022-08-02 18:41:49,605 - INFO - psysmon:                                                                                                                                   '*.msd, '
#DET# - 2022-08-02 18:41:49,605 - INFO - psysmon:                                                                                                                                   '*.mseed',
#DET# - 2022-08-02 18:41:49,605 - INFO - psysmon:                                                                                                                                   '',
#DET# - 2022-08-02 18:41:49,605 - INFO - psysmon:                                                                                                                                   '']]}}}}}}}}
#LOG# - 2022-08-02 18:41:49,625 - INFO - psysmon.packages.obspyImportWaveform.import_filesystem_data.ImportFilesystemData: Importing data from waveformdirectory 1 - db client.
#LOG# - 2022-08-02 18:41:49,626 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Importing new data files only.
#LOG# - 2022-08-02 18:41:49,629 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Scanning directory: /home/stefan/tutorial/dataset/mseed.
#LOG# - 2022-08-02 18:41:49,629 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Scanning directory: /home/stefan/tutorial/dataset/mseed/2018.
#LOG# - 2022-08-02 18:41:49,629 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Scanning directory: /home/stefan/tutorial/dataset/mseed/2018/298.
#LOG# - 2022-08-02 18:41:49,629 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Scanning directory: /home/stefan/tutorial/dataset/mseed/2018/298/00004.
#LOG# - 2022-08-02 18:41:55,569 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Writing the data to the database.
#LOG# - 2022-08-02 18:41:55,926 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Scanning directory: /home/stefan/tutorial/dataset/mseed/2018/298/00006.
#LOG# - 2022-08-02 18:42:02,916 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Writing the data to the database.
#LOG# - 2022-08-02 18:42:03,080 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Scanning directory: /home/stefan/tutorial/dataset/mseed/2018/298/00008.
#LOG# - 2022-08-02 18:42:10,433 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Writing the data to the database.
#LOG# - 2022-08-02 18:42:10,729 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Scanning directory: /home/stefan/tutorial/dataset/mseed/2018/298/00009.
#LOG# - 2022-08-02 18:42:18,001 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Writing the data to the database.
#LOG# - 2022-08-02 18:42:18,594 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Scanning directory: /home/stefan/tutorial/dataset/mseed/2018/298/0000B.
#LOG# - 2022-08-02 18:42:27,251 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Writing the data to the database.
#LOG# - 2022-08-02 18:42:27,512 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Scanning directory: /home/stefan/tutorial/dataset/mseed/2018/299.
#LOG# - 2022-08-02 18:42:27,513 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Scanning directory: /home/stefan/tutorial/dataset/mseed/2018/299/00004.
#LOG# - 2022-08-02 18:42:35,093 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Writing the data to the database.
#LOG# - 2022-08-02 18:42:35,742 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Scanning directory: /home/stefan/tutorial/dataset/mseed/2018/299/00006.
#LOG# - 2022-08-02 18:42:44,920 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Writing the data to the database.
#LOG# - 2022-08-02 18:42:45,233 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Scanning directory: /home/stefan/tutorial/dataset/mseed/2018/299/00008.
#LOG# - 2022-08-02 18:42:53,105 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Writing the data to the database.
#LOG# - 2022-08-02 18:42:53,411 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Scanning directory: /home/stefan/tutorial/dataset/mseed/2018/299/00009.
#LOG# - 2022-08-02 18:43:00,346 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Writing the data to the database.
#LOG# - 2022-08-02 18:43:00,592 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Scanning directory: /home/stefan/tutorial/dataset/mseed/2018/299/0000B.
#LOG# - 2022-08-02 18:43:07,179 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Writing the data to the database.
#LOG# - 2022-08-02 18:43:07,381 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Scanning directory: /home/stefan/tutorial/dataset/mseed/2018/300.
#LOG# - 2022-08-02 18:43:07,382 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Scanning directory: /home/stefan/tutorial/dataset/mseed/2018/300/00004.
#LOG# - 2022-08-02 18:43:15,205 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Writing the data to the database.
#LOG# - 2022-08-02 18:43:15,454 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Scanning directory: /home/stefan/tutorial/dataset/mseed/2018/300/00006.
#LOG# - 2022-08-02 18:43:34,185 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Writing the data to the database.
#LOG# - 2022-08-02 18:43:34,458 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Scanning directory: /home/stefan/tutorial/dataset/mseed/2018/300/00008.
#LOG# - 2022-08-02 18:44:11,402 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Writing the data to the database.
#LOG# - 2022-08-02 18:44:11,988 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Scanning directory: /home/stefan/tutorial/dataset/mseed/2018/300/00009.
#LOG# - 2022-08-02 18:44:20,214 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Writing the data to the database.
#LOG# - 2022-08-02 18:44:20,389 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Scanning directory: /home/stefan/tutorial/dataset/mseed/2018/300/0000B.
#LOG# - 2022-08-02 18:44:24,930 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Writing the data to the database.
#LOG# - 2022-08-02 18:44:25,051 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Scanning directory: /home/stefan/tutorial/dataset/mseed/2018/301.
#LOG# - 2022-08-02 18:44:25,051 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Scanning directory: /home/stefan/tutorial/dataset/mseed/2018/301/00004.
#LOG# - 2022-08-02 18:44:31,401 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Writing the data to the database.
#LOG# - 2022-08-02 18:44:31,581 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Scanning directory: /home/stefan/tutorial/dataset/mseed/2018/301/00006.
#LOG# - 2022-08-02 18:44:37,956 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Writing the data to the database.
#LOG# - 2022-08-02 18:44:38,878 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Scanning directory: /home/stefan/tutorial/dataset/mseed/2018/301/00008.
#LOG# - 2022-08-02 18:44:47,429 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Writing the data to the database.
#LOG# - 2022-08-02 18:44:47,557 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Scanning directory: /home/stefan/tutorial/dataset/mseed/2018/301/00009.
#LOG# - 2022-08-02 18:44:55,439 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Writing the data to the database.
#LOG# - 2022-08-02 18:44:55,769 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Scanning directory: /home/stefan/tutorial/dataset/mseed/2018/301/0000B.
#LOG# - 2022-08-02 18:45:05,012 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Writing the data to the database.
#LOG# - 2022-08-02 18:45:05,172 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Scanning directory: /home/stefan/tutorial/dataset/mseed/2018/302.
#LOG# - 2022-08-02 18:45:05,174 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Scanning directory: /home/stefan/tutorial/dataset/mseed/2018/302/00004.
#LOG# - 2022-08-02 18:45:13,011 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Writing the data to the database.
#LOG# - 2022-08-02 18:45:13,363 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Scanning directory: /home/stefan/tutorial/dataset/mseed/2018/302/00006.
#LOG# - 2022-08-02 18:45:22,113 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Writing the data to the database.
#LOG# - 2022-08-02 18:45:22,440 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Scanning directory: /home/stefan/tutorial/dataset/mseed/2018/302/00008.
#LOG# - 2022-08-02 18:45:30,413 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Writing the data to the database.
#LOG# - 2022-08-02 18:45:31,237 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Scanning directory: /home/stefan/tutorial/dataset/mseed/2018/302/00009.
#LOG# - 2022-08-02 18:45:38,993 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Writing the data to the database.
#LOG# - 2022-08-02 18:45:39,464 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Scanning directory: /home/stefan/tutorial/dataset/mseed/2018/302/0000B.
#LOG# - 2022-08-02 18:45:44,856 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Writing the data to the database.
#LOG# - 2022-08-02 18:45:44,943 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Scanning directory: /home/stefan/tutorial/dataset/mseed/2018/303.
#LOG# - 2022-08-02 18:45:44,944 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Scanning directory: /home/stefan/tutorial/dataset/mseed/2018/303/00004.
#LOG# - 2022-08-02 18:45:51,279 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Writing the data to the database.
#LOG# - 2022-08-02 18:45:51,888 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Scanning directory: /home/stefan/tutorial/dataset/mseed/2018/303/00006.
#LOG# - 2022-08-02 18:45:59,614 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Writing the data to the database.
#LOG# - 2022-08-02 18:45:59,957 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Scanning directory: /home/stefan/tutorial/dataset/mseed/2018/303/00008.
#LOG# - 2022-08-02 18:46:07,730 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Writing the data to the database.
#LOG# - 2022-08-02 18:46:07,967 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Scanning directory: /home/stefan/tutorial/dataset/mseed/2018/303/00009.
#LOG# - 2022-08-02 18:46:14,420 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Writing the data to the database.
#LOG# - 2022-08-02 18:46:14,653 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Scanning directory: /home/stefan/tutorial/dataset/mseed/2018/303/0000B.
#LOG# - 2022-08-02 18:46:20,161 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Writing the data to the database.
#LOG# - 2022-08-02 18:46:20,275 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Scanning directory: /home/stefan/tutorial/dataset/mseed/2018/304.
#LOG# - 2022-08-02 18:46:20,276 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Scanning directory: /home/stefan/tutorial/dataset/mseed/2018/304/00004.
#LOG# - 2022-08-02 18:46:26,209 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Writing the data to the database.
#LOG# - 2022-08-02 18:46:26,501 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Scanning directory: /home/stefan/tutorial/dataset/mseed/2018/304/00006.
#LOG# - 2022-08-02 18:46:33,891 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Writing the data to the database.
#LOG# - 2022-08-02 18:46:34,158 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Scanning directory: /home/stefan/tutorial/dataset/mseed/2018/304/00008.
#LOG# - 2022-08-02 18:46:41,239 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Writing the data to the database.
#LOG# - 2022-08-02 18:46:41,429 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Scanning directory: /home/stefan/tutorial/dataset/mseed/2018/304/00009.
#LOG# - 2022-08-02 18:46:46,178 - ERROR - psysmon.core.waveclient.PsysmonDbWaveClient: Unknown file format. Skipping this file.
#LOG# - 2022-08-02 18:46:46,256 - ERROR - psysmon.core.waveclient.PsysmonDbWaveClient: Unknown file format. Skipping this file.
#LOG# - 2022-08-02 18:46:46,311 - ERROR - psysmon.core.waveclient.PsysmonDbWaveClient: Unknown file format. Skipping this file.
#LOG# - 2022-08-02 18:46:46,366 - ERROR - psysmon.core.waveclient.PsysmonDbWaveClient: Unknown file format. Skipping this file.
#LOG# - 2022-08-02 18:46:46,415 - ERROR - psysmon.core.waveclient.PsysmonDbWaveClient: Unknown file format. Skipping this file.
#LOG# - 2022-08-02 18:46:46,470 - ERROR - psysmon.core.waveclient.PsysmonDbWaveClient: Unknown file format. Skipping this file.
#LOG# - 2022-08-02 18:46:47,669 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Writing the data to the database.
#LOG# - 2022-08-02 18:46:47,862 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Scanning directory: /home/stefan/tutorial/dataset/mseed/2018/304/0000B.
#LOG# - 2022-08-02 18:46:52,719 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Writing the data to the database.
#LOG# - 2022-08-02 18:46:52,895 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Scanning directory: /home/stefan/tutorial/dataset/mseed/2018/305.
#LOG# - 2022-08-02 18:46:52,897 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Scanning directory: /home/stefan/tutorial/dataset/mseed/2018/305/00004.
#LOG# - 2022-08-02 18:46:59,476 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Writing the data to the database.
#LOG# - 2022-08-02 18:46:59,787 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Scanning directory: /home/stefan/tutorial/dataset/mseed/2018/305/00006.
#LOG# - 2022-08-02 18:47:06,813 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Writing the data to the database.
#LOG# - 2022-08-02 18:47:06,936 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Scanning directory: /home/stefan/tutorial/dataset/mseed/2018/305/00008.
#LOG# - 2022-08-02 18:47:23,451 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Writing the data to the database.
#LOG# - 2022-08-02 18:47:23,899 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Scanning directory: /home/stefan/tutorial/dataset/mseed/2018/305/00009.
#LOG# - 2022-08-02 18:47:30,612 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Writing the data to the database.
#LOG# - 2022-08-02 18:47:30,974 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Scanning directory: /home/stefan/tutorial/dataset/mseed/2018/305/0000B.
#LOG# - 2022-08-02 18:47:35,714 - INFO - psysmon.core.waveclient.PsysmonDbWaveClient: Writing the data to the database.
#LOG# - 2022-08-02 18:47:36,219 - INFO - psysmon: Finished the execution. Cleaning up....
#LOG# - 2022-08-02 18:47:36,220 - INFO - psysmon: Unregistering the exported data from the project server.
#LOG# - 2022-08-02 18:47:36,220 - INFO - psysmon: Deleting data file /home/stefan/tutorial/psysmon_projects/tutorial/tmp/data import_20220802_184147_595587.ced.
~~~

## Checking the database
You can verify that the data has been imported to the psysmon database using the mysql client in the Linux terminal. The involved database tables are `tutorial_waveform_dir`, `tutorial_datafile` and `tutorial_traceheader`. Linking to entries in other tables is usually done by their ids. `tutorial_waveform_dir` describes the waveform directory, which is referenced in the `tutorial_datafile` using the `wf_id` column. The relative filepath to the individual data files is shown in the column `filename`  of the `tutorial_datafile` table. The header information of the data files is given in table `tutorial_traceheader`. The `datafile_id` column in this table links to the `id` column in the `tutorial_datafile` table..

~~~console
stefan@hausmeister:~$ mysql -u tutorial -p
Enter password: 
Welcome to the MariaDB monitor.  Commands end with ; or \g.
Your MariaDB connection id is 47
Server version: 10.3.34-MariaDB-0ubuntu0.20.04.1 Ubuntu 20.04

Copyright (c) 2000, 2018, Oracle, MariaDB Corporation Ab and others.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

MariaDB [(none)]> use psysmon_tutorial;
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
MariaDB [psysmon_tutorial]> select * from tutorial_waveform_dir;
+----+------------+-------------------------------------+------------------------------------------------+----------------+----------------------------+----------------------------+
| id | waveclient | directory                           | description                                    | file_ext       | first_import               | last_scan                  |
+----+------------+-------------------------------------+------------------------------------------------+----------------+----------------------------+----------------------------+
|  1 | db client  | /home/stefan/tutorial/dataset/mseed | The tutorial data set miniseed base directory. | *.msd, *.mseed | 2022-08-02T16:41:49.625940 | 2022-08-02T16:41:49.625940 |
+----+------------+-------------------------------------+------------------------------------------------+----------------+----------------------------+----------------------------+
1 row in set (0.000 sec)

MariaDB [psysmon_tutorial]> select * from tutorial_datafile limit 10;
+----+-------+----------------------------------------------+----------+-----------+----------------------------------------------------+------------+------------+----------------------------+
| id | wf_id | filename                                     | filesize | file_type | orig_path                                          | agency_uri | author_uri | creation_time              |
+----+-------+----------------------------------------------+----------+-----------+----------------------------------------------------+------------+------------+----------------------------+
|  1 |     1 | 2018/298/00004/2018_298_000000_00004_001.msd |  4387840 | MSEED     | /home/stefan/tutorial/dataset/mseed/2018/298/00004 | sm         | mr         | 2022-08-02T16:41:49.785889 |
|  2 |     1 | 2018/298/00004/2018_298_000000_00004_002.msd |  4563460 | MSEED     | /home/stefan/tutorial/dataset/mseed/2018/298/00004 | sm         | mr         | 2022-08-02T16:41:49.944166 |
|  3 |     1 | 2018/298/00004/2018_298_000000_00004_003.msd |  4309500 | MSEED     | /home/stefan/tutorial/dataset/mseed/2018/298/00004 | sm         | mr         | 2022-08-02T16:41:50.034813 |
|  4 |     1 | 2018/298/00004/2018_298_010000_00004_001.msd |  4384770 | MSEED     | /home/stefan/tutorial/dataset/mseed/2018/298/00004 | sm         | mr         | 2022-08-02T16:41:50.114888 |
|  5 |     1 | 2018/298/00004/2018_298_010000_00004_002.msd |  4563460 | MSEED     | /home/stefan/tutorial/dataset/mseed/2018/298/00004 | sm         | mr         | 2022-08-02T16:41:50.201756 |
|  6 |     1 | 2018/298/00004/2018_298_010000_00004_003.msd |  4306430 | MSEED     | /home/stefan/tutorial/dataset/mseed/2018/298/00004 | sm         | mr         | 2022-08-02T16:41:50.281518 |
|  7 |     1 | 2018/298/00004/2018_298_020000_00004_001.msd |  4379650 | MSEED     | /home/stefan/tutorial/dataset/mseed/2018/298/00004 | sm         | mr         | 2022-08-02T16:41:50.361469 |
|  8 |     1 | 2018/298/00004/2018_298_020000_00004_002.msd |  4562430 | MSEED     | /home/stefan/tutorial/dataset/mseed/2018/298/00004 | sm         | mr         | 2022-08-02T16:41:50.440944 |
|  9 |     1 | 2018/298/00004/2018_298_020000_00004_003.msd |  4302340 | MSEED     | /home/stefan/tutorial/dataset/mseed/2018/298/00004 | sm         | mr         | 2022-08-02T16:41:50.528231 |
| 10 |     1 | 2018/298/00004/2018_298_030000_00004_001.msd |  4377600 | MSEED     | /home/stefan/tutorial/dataset/mseed/2018/298/00004 | sm         | mr         | 2022-08-02T16:41:50.601484 |
+----+-------+----------------------------------------------+----------+-----------+----------------------------------------------------+------------+------------+----------------------------+
10 rows in set (0.001 sec)

MariaDB [psysmon_tutorial]> select * from tutorial_traceheader limit 10;
+----+-------------+-----------------+--------+---------+-----+---------+---------------------+------------+------------+------------+----------------------------+
| id | datafile_id | recorder_serial | stream | network | sps | numsamp | begin_date          | begin_time | agency_uri | author_uri | creation_time              |
+----+-------------+-----------------+--------+---------+-----+---------+---------------------+------------+------------+------------+----------------------------+
|  1 |           1 | 00004           | 00:001 | XX      | 800 | 2880000 | 2018-10-25 00:00:00 | 1540425600 | sm         | mr         | 2022-08-02T16:41:49.937371 |
|  2 |           2 | 00004           | 00:002 | XX      | 800 | 2880000 | 2018-10-25 00:00:00 | 1540425600 | sm         | mr         | 2022-08-02T16:41:50.029280 |
|  3 |           3 | 00004           | 00:003 | XX      | 800 | 2880000 | 2018-10-25 00:00:00 | 1540425600 | sm         | mr         | 2022-08-02T16:41:50.110982 |
|  4 |           4 | 00004           | 00:001 | XX      | 800 | 2880000 | 2018-10-25 01:00:00 | 1540429200 | sm         | mr         | 2022-08-02T16:41:50.196687 |
|  5 |           5 | 00004           | 00:002 | XX      | 800 | 2880000 | 2018-10-25 01:00:00 | 1540429200 | sm         | mr         | 2022-08-02T16:41:50.277970 |
|  6 |           6 | 00004           | 00:003 | XX      | 800 | 2880000 | 2018-10-25 01:00:00 | 1540429200 | sm         | mr         | 2022-08-02T16:41:50.357699 |
|  7 |           7 | 00004           | 00:001 | XX      | 800 | 2880000 | 2018-10-25 02:00:00 | 1540432800 | sm         | mr         | 2022-08-02T16:41:50.435983 |
|  8 |           8 | 00004           | 00:002 | XX      | 800 | 2880000 | 2018-10-25 02:00:00 | 1540432800 | sm         | mr         | 2022-08-02T16:41:50.523527 |
|  9 |           9 | 00004           | 00:003 | XX      | 800 | 2880000 | 2018-10-25 02:00:00 | 1540432800 | sm         | mr         | 2022-08-02T16:41:50.597821 |
| 10 |          10 | 00004           | 00:001 | XX      | 800 | 2880000 | 2018-10-25 03:00:00 | 1540436400 | sm         | mr         | 2022-08-02T16:41:50.678401 |
+----+-------------+-----------------+--------+---------+-----+---------+---------------------+------------+------------+------------+----------------------------+
10 rows in set (0.000 sec)

MariaDB [psysmon_tutorial]> exit
Bye
stefan@hausmeister:~$ 
~~~

## Save the project
If not done yet, save the project by selecting the menu entry `File->Save project`. Its fine to save the project frequently to avoid loosing changes of collection node parameters in the current collection.


[chap-import-geometry-file]: {% link en/_tutorial_sonnblick_events/04_import_geometry_data.md %}#opening-the-geometry-editor
[chap-project-directory]: {% link en/_tutorial_sonnblick_events/02_project_creation.md %}#project-directory
[chap-setting-up-the-database]: {% link en/_tutorial_sonnblick_events/01_getting_started.md %}#setting-up-the-database


