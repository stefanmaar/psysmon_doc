---
title: "Import geometry file"
layout: doc_chapter
subheadline: "Reading the station layout from a geometry file."
description: "Reading the station layout from a geometry file."
teaser: "The psysmon geometry is stored in a database. It can be imported from an geometry XML file."
image_dir: tut_sbe/import_geometry

namespace: tut_sbe_import_geometry

type: chapter

permalink: import_geometry

figures:
    create-geometry-collection:
        label: "fig:create-geometry-collection"
        number: 1
        filename: screenshot_create_new_collection.png
        caption: "Create a new collection using the context menu in the collection listbox. The context menu can be opened using the right mouse button while the mouse pointer is inside the collection listbox."
        
    new-collection-dialog:
        label: "fig:new-collection-dialog"
        number: 2
        filename: screenshot_new_collection_dialog.png
        caption: "Enter the name geometry for the new collection."
        
    geometry-collection-created:
        label: "fig:geometry-collection-created"
        number: 3
        filename: screenshot_geometry_collection_created.png
        caption: "After successful creation of a new collection the collection name will be shown on top of the collection listbox."
        
    add-edit-geometry-node:
        label: "fig:add-edit-geometry-node"
        number: 4
        filename: screenshot_add_edit_geometry_node.png
        caption: "Limit the displayed collection nodes by entering the search term in the search field (here: geom). Select the edit geometry node, open the context menu by clicking the right mouse button and select the add menu entry."
        
    edit-geometry-node-added:
        label: "fig:edit-geometry-node-added"
        number: 4
        filename: screenshot_edit_geometry_node_added.png
        caption: "The edit geometry collection node should appear in the collection listbox on the left side."
        
    execute-geometry-collection:
        label: "fig:execute-geometry-collection"
        number: 5
        filename: screenshot_execute_collection.png
        caption: "After executing the geometry collection, the geometry editor dialog should open up."
        
    import-from-xml:
        label: "fig:import-from-xml"
        number: 6
        filename: screenshot_import_geometry_from_xml.png
        caption: "Start importing a geometry from a XML file by selecting the menu File->Import from XML."
        
    geometry-file-imported:
        label: "fig:geometry-file-imported"
        number: 7
        filename: screenshot_geometry_file_imported.png
        caption: "The geometry editor right after the import of a geometry file. The seisrock_sbk inventory was added as a XML inventory below the db_inventory. All elements of the inventory are expanded."
        
    geometry-overview:
        label: "fig:geometry-overview"
        number: 8
        filename: screenshot_geometry_overview.png
        caption: "Overview of the tutorial inventory."
        
    write-to-database:
        label: "fig:write-to-database"
        number: 9
        filename: screenshot_write_to_database.png
        caption: "Select the XML inventory and then click the menu Edit->Write to database."
        
    written-to-database:
        label: "fig:written-to-database"
        number: 10
        filename: screenshot_xml_inventory_written_to_database.png
        caption: "After the XML inventory was written to the database, the database inventory db_inventory is shown expanded."
        
    db-inventory-overview:
        label: "fig:db-inventory-overview"
        number: 11
        filename: screenshot_db_inventory_overview.png
        caption: "The overview of the data base inventory. After a successful import it should contain the same elements as the XML inventory."
        
    inventory-map-view:
        label: "fig:inventory-map-view"
        number: 12
        filename: screenshot_inventory_map_view.png
        caption: "The map view of an inventory can be opened by selecting the map view tap in the panel view."
---
To import the station layout of the seismic network installed at *Hoher Sonnblick* the file `seisrock_sbk_inventory.xml` of the tutorial data set is needed. Make shure, that you have this file available at your filesystem.

## Opening the geometry editor
To import the geometry file, the collection node `edit geometry` has to be executed. The access the geometry editor using the `edit geometry` collection node involves the follwing steps.

### Create a collection named geometry
To create a new collection, move the mouse pointer inside the collection listbox on the left side of the window and then open the context menu by clicking the right mouse button. In the context menu click the menu entry `new collection`.

{% include insert_image.html key="create-geometry-collection" %}

The `New collection` dialog will open. Enter the name `geometry` for the new collection and confirm by clicking the `ok` button.

{% include insert_image.html key="new-collection-dialog" %}

The title of the collection listbox will be changed to `geometry`.

{% include insert_image.html key="geometry-collection-created" %}

### Add the edit geometry collection node
To add the `edit geometry` collection node, start typing `geometry` in the search field on top of the collection node inventory listbox (the field with the magnifying glass). While typing, the entries in the collection node inventory listbox will change according to the search term. When reaching the search term `geom`, only the `edit geometry` collection node should be shown in the collection node inventory listbox. Select the `edit geometry` collection node in the inventory listbox and add it using the `add` item in the context menu. The context menu can be opened by clicking the right mouse button.

{% include insert_image.html key="add-edit-geometry-node" %}

After selecting the `add` menu entry, the `edit geometry` collection node should appear in the collection listbox on the left.

If you are wondering about the warning message marked in orange in the log area, this warning was caused by me when I clicked the `help` menu entry in the context menu. The help system is currently not working.

{% include insert_image.html key="edit-geometry-node-added" %}

### Execute the geometry collection
To open the geometry editor you now have to execute the geometry collection. This is done by clicking the `execute` button at the bottom of the collection listbox. The geometry editor should be shown. For this tutorial, now geometry has been defined so far, so an empty database inventory named `db_inventory` will be shown in the editor. The lists for the available sensors, recorders, networks and arrays should be empty at that point.

{% include insert_image.html key="execute-geometry-collection" %}


## Opening the geometry XML file
To import a geometry XML file select the menu `File->Import from XML` in the menu bar of the geometry editor.

{% include insert_image.html key="import-from-xml" %}

A file selection dialog will open. Navigate to the geometry file `seisrock_sbk_inventory.xml` of the tutorial data set and open it. The inventory will be read from the XML file and displayed in the geometry editor as an xml inventory. After importing the geometry file, all elements of the inventory will be expanded by default.

{% include insert_image.html key="geometry-file-imported" %}

You can collapse the whole inentory tree by clicking the `seisrock_sbk(xml)` inventory item in the inventory tree and then opening the context menu by clicking the right mouse button. Select the `collapse` menu entry in the context menu. The `seisrock_sbk(xml)` inventory tree will be collapsed. Expand the desired tree items by clicking the triangles on the left of the inventory tree items.

Selecting items in the inventory tree will show details of the item in the `list view` panel on the right side of the geometry editor. In the following example I have expanded all items on level 1 of the inventory tree (Sensors, Recorders, Networks, Arrays) and the network `XX` to show the stations of the network. I have selected the network `XX` item in the inventory tree to display the network summary in the list view.

{% include insert_image.html key="geometry-overview" %}

## Importing the XML inventory into the database
Once the geometry imported from the XML file was checked for correctness, it can be written to the psysmon database to make it permanently available. Usually the import of the geometry from an XML file to the psysmon database has to be done once at the start of the project.

When the inventory changes over time (e.g. new stations, change of sensors or recorders, ...) the database inventory can be updated by re-importing the inventory from the updated geometry file.

To write the `seisrock_sbk(xml)` inventory to the database, select the `seisrock_sbk(xml)` item in the inventory tree and then click the menu item `Edit->Write to database.

{% include insert_image.html key="write-to-database" %}

After the XML inventory was written successfully to the database, the database inventory `db_inventory(db)` is shown expanded in the inventory tree.

{% include insert_image.html key="written-to-database" %}

Use the context menu and the expand/collapse triangles of the inventory tree as described above to create an overview of the database inventory in the inventory tree and the list view.

{% include insert_image.html key="db-inventory-overview" %}

## Map view of the inventory
The map view of the inventory selected in the inventory tree can be opened by selecting the `map view` tab in the panel view of the geometry editor. This will swap from the list view to the map view showing the positions of the station locations. The 5 stations of the Sonnblick network should be shown. Stations MOR, PIL and MIT are arrays with three locations A, B and C. You will notice, that the locations of the array MIT are co-located. This is ok, because at that time, these stations have not yet been installed at their correct array locations.

{% include insert_image.html key="inventory-map-view" %}

## Close the editor
The geometry has now been imported into the psysmon database. The geometry editor can now be closed, either by clicking the window close icon (usually a cross) on the top right of the window frame or by clicking the menu entry `File->Exit`.

## Save the project
Return to the psysmon main window and select the menu entry `File->Save project`. This will save the newly created collection `geometry` for later use.
