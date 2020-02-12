/*!
 * Flowtime.js
 * http://marcolago.com/flowtime-js/
 * MIT licensed
 *
 * Copyright (C) 2012-2013 Marco Lago, http://marcolago.com
 */

var Flowtime = (function ()
{

	/**
	 * test if the device is touch enbled
	 */
	var isTouchDevice = 'ontouchstart' in document.documentElement;
	
	/**
	 * test if the HTML History API's where available
	 * this value can be overridden to disable the History API
	 */
	var pushHistory = window.history.pushState;
	
	/**
	 * application constants
	 */
	var SECTION_CLASS = "ft-section";
	var SECTION_SELECTOR = "." + SECTION_CLASS;
	var PAGE_CLASS = "ft-page";
	var PAGE_SELECTOR = "." + PAGE_CLASS;
	var FRAGMENT_CLASS = "ft-fragment";
	var FRAGMENT_SELECTOR = "." + FRAGMENT_CLASS;
	var FRAGMENT_REVEALED_CLASS = "revealed";
	var FRAGMENT_ACTUAL_CLASS = "actual";
	var FRAGMENT_REVEALED_TEMP_CLASS = "revealed-temp";
	var DEFAULT_PROGRESS_CLASS = "ft-default-progress";
	var DEFAULT_PROGRESS_SELECTOR = "." + DEFAULT_PROGRESS_CLASS;
	var SECTION_THUMB_CLASS = "ft-section-thumb";
	var SECTION_THUMB_SELECTOR = "." + SECTION_THUMB_CLASS;
	var PAGE_THUMB_CLASS = "ft-page-thumb";
	var PAGE_THUMB_SELECTOR = "." + PAGE_THUMB_CLASS;

	/**
	 * events
	 */

	var NAVIGATION_EVENT = "flowtimenavigation";
	/**
	 * application variables
	 */
	var ftContainer = document.querySelector(".flowtime");			// cached reference to .flowtime element
	var html = document.querySelector("html");						// cached reference to html element
	var body = document.querySelector("body");						// cached reference to body element
	var useHash = false;											// if true the engine uses only the hash change logic
	var currentHash = "";											// the hash string of the current section / page pair
	var pastIndex = { section:0, page:0 };							// section and page indexes of the past page
	var isOverview = false;											// Boolean status for the overview 
	var siteName = document.title;									// cached base string for the site title
	var overviewCachedDest;											// caches the destination before performing an overview zoom out for navigation back purposes
	var overviewFixedScaleFactor = 22;								// fixed scale factor for overview variant
	var defaultProgress = null;										// default progress bar reference

	var _fragmentsOnSide = false;									// enable or disable fragments navigation when navigating from sections
	var _fragmentsOnBack = true;									// shows or hide fragments when navigating back to a page
	var _slideInPx = false;											// calculate the slide position in px instead of %, use in case the % mode does not works
	var _sectionsSlideToTop = false;								// if true navigation with right or left arrow go to the first page of the section
	var _useOverviewVariant = false;								// use an alternate overview layout and navigation (experimental - useful in case of rendering issues)
	var _twoStepsSlide = false;										// not yet implemented! slides up or down before, then slides to the page
	var _showProgress = false;										// show or hide the default progress indicator (leave false if you want to implement a custom progress indicator)
	var _parallaxInPx = false;										// if false the parallax movement is calulated in % values, if true in pixels
	var defaultParallaxX = 50;										// the default parallax horizontal value used when no data-parallax value were specified
	var defaultParallaxY = 50;										// the default parallax vertical value used when no data-parallax value were specified
	
	var parallaxEnabled = document.querySelector(".parallax") != null; // performance tweak, if there is no elements with .parallax class disable the dom manipulation to boost performances


	/**
	 * test the base support
	 */
	var browserSupport = true;
	try
	{
		var htmlClass = document.querySelector("html").className.toLowerCase();
		if (htmlClass.indexOf("ie7") != -1 ||
			htmlClass.indexOf("ie8") != -1 ||
			htmlClass.indexOf("lt-ie9") != -1 )
		{
			browserSupport = false;
		}
	}
	catch(e)
	{
		browserSupport = false;
	}
	/**
	 * add "ft-absolute-nav" hook class to body
	 * to set the CSS properties
	 * needed for application scrolling
	 */
	if (browserSupport)
	{
		Brav1Toolbox.addClass(body, "ft-absolute-nav");
	}

/*
	##    ##    ###    ##     ## ####  ######      ###    ######## ####  #######  ##    ## ##     ##    ###    ######## ########  #### ##     ## 
	###   ##   ## ##   ##     ##  ##  ##    ##    ## ##      ##     ##  ##     ## ###   ## ###   ###   ## ##      ##    ##     ##  ##   ##   ##  
	####  ##  ##   ##  ##     ##  ##  ##         ##   ##     ##     ##  ##     ## ####  ## #### ####  ##   ##     ##    ##     ##  ##    ## ##   
	## ## ## ##     ## ##     ##  ##  ##   #### ##     ##    ##     ##  ##     ## ## ## ## ## ### ## ##     ##    ##    ########   ##     ###    
	##  #### #########  ##   ##   ##  ##    ##  #########    ##     ##  ##     ## ##  #### ##     ## #########    ##    ##   ##    ##    ## ##   
	##   ### ##     ##   ## ##    ##  ##    ##  ##     ##    ##     ##  ##     ## ##   ### ##     ## ##     ##    ##    ##    ##   ##   ##   ##  
	##    ## ##     ##    ###    ####  ######   ##     ##    ##    ####  #######  ##    ## ##     ## ##     ##    ##    ##     ## #### ##     ## 
*/

	/**
	 * NavigationMatrix is the Object who store the navigation grid structure
	 * and which expose all the methods to get and set the navigation destinations
	 */
	
	var NavigationMatrix = (function ()
	{
		var sections;						// HTML Collection of .flowtime > .ft-section elements
		var sectionsArray;					// multi-dimensional array containing the pages' array
		var allPages;						// HTML Collection of .flowtime .ft-page elements
		var fragments;						// HTML Collection of .fragment elements
		var fragmentsArray;					// multi-dimensional array containing the per page fragments' array
		var fr = [];						// multi-dimensional array containing the index of the current active fragment per page
		var parallaxElements = [];			// array containing all elements with parrallax
		var sectionsLength = 0;				// cached total number of .ft-section elements
		var pagesLength = 0;				// cached max number of .page elements
		var pagesTotalLength = 0;			// cached total number of .page elements
		var p = 0;							// index of the current section viewved or higlighted
		var sp = 0;							// index of the current page viewved or higlighted
		var pCache = 0;						// cache index of the current section
		var spCache = 0;					// cache index of the current page
		var hilited;						// the current page higlighted, useful for overview mode
		
		/**
		 * update the navigation matrix array
		 * this is a publicy exposed method
		 * useful for updating the matrix whne the site structure changes at runtime
		 */
		function _updateMatrix()
		{
			sectionsArray = [];
			parallaxElements = [];
			fragments = document.querySelectorAll(FRAGMENT_SELECTOR);
			fragmentsArray = [];
			sections = ftContainer.querySelectorAll(".flowtime > " + SECTION_SELECTOR);
			allPages = ftContainer.querySelectorAll(".flowtime " + PAGE_SELECTOR);
			//
			for (var i = 0; i < sections.length; i++)
			{
				var pagesArray = [];
				var section = sections[i];
				fragmentsArray[i] = [];
				fr[i] = [];
				//
				if (section.getAttribute("data-id"))
				{
					section.setAttribute("data-id", "__" + unsafeAttr(section.getAttribute("data-id"))); // prevents attributes starting with a number
				}
				section.setAttribute("data-prog", "__" + (i + 1));
				section.index = i;
				section.setAttribute("id", "");
				//
				pages = section.querySelectorAll(PAGE_SELECTOR);
				pagesTotalLength += pages.length;
				pagesLength = Math.max(pagesLength, pages.length); // sets the pages max number for overview purposes
				for (var ii = 0; ii < pages.length; ii++)
				{
					var _sp = pages[ii];
					if (_sp.getAttribute("data-id"))
					{
						_sp.setAttribute("data-id", "__" + unsafeAttr(_sp.getAttribute("data-id"))); // prevents attributes starting with a number
					}
					_sp.setAttribute("data-prog", "__" + (ii + 1));
					_sp.index = ii;
					_sp.setAttribute("id", "");
					// set data-title attributes to pages that doesn't have one and have at least an h1 heading element inside
					if (!_sp.getAttribute("data-title"))
					{
						var heading = _sp.querySelector("h1");
						if (heading != null && heading.textContent.lenght != "")
						{
							_sp.setAttribute("data-title", heading.textContent);
						}
					}
					// store parallax data on elements
					setParallax(_sp, i, ii);
					//
					pagesArray.push(_sp);
					//
					var subFragments = _sp.querySelectorAll(FRAGMENT_SELECTOR);
					fragmentsArray[i][ii] = subFragments;
					fr[i][ii] = -1;
				}
				sectionsArray.push(pagesArray);
			}
			//
			sectionsLength = sections.length; // sets the sections max number for overview purposes
			resetScroll();
			_updateOffsets();
		}

		/**
		 * stores parallax data directly on the dome elements with a data-parallax attribute
		 * data are stored on a multi dimensional array ordered per section and per page to easily manage the position
		 */
		function setParallax(page, sectionIndex, pageIndex)
		{
			if (parallaxEnabled)
			{
				if (parallaxElements[sectionIndex] == undefined)
				{
					parallaxElements[sectionIndex] = [];
				}
				if (parallaxElements[sectionIndex][pageIndex] == undefined)
				{
					parallaxElements[sectionIndex][pageIndex] = [];
				}
				//
				var pxs = page.querySelectorAll(".parallax");
				if (pxs.length > 0)
				{
					for (var i = 0; i < pxs.length; i++)
					{
						var el = pxs[i];
						var pX = defaultParallaxX;
						var pY = defaultParallaxY;
						if (el.getAttribute("data-parallax") != null)
						{
							var pValues = el.getAttribute("data-parallax").split(",");
							pX = pY = pValues[0];
							if (pValues.length > 1)
							{
								pY = pValues[1];
							}
						}
						el.pX = pX;
						el.pY = pY;
						parallaxElements[sectionIndex][pageIndex].push(el);
					}
				}
			}
		}

		function _getParallaxElements()
		{
			return parallaxElements;
		}

		/**
		 * cache the position for every page, useful when navigatin in pixels or when attaching a page after scrolling
		 */
		function _updateOffsets ()
		{
			for (var i = 0; i < allPages.length; i++)
			{
				var _sp = allPages[i];
				_sp.x = _sp.offsetLeft + _sp.parentNode.offsetLeft;
				_sp.y = _sp.offsetTop + _sp.parentNode.offsetTop;
			}
		};
		
		/**
		 * returns the next section in navigation
		 * @param	top	Boolean	if true the next page will be the first page in the next array; if false the next section will be the same index page in the next array
		 * @param	fos	Boolean value of _fragmentsOnSide
		 * @param	io	Boolean	value of isOverview
		 */
		function _getNextSection(top, fos, io)
		{
			var sub = sp;
			var toTop = top == !_sectionsSlideToTop;
			if (fos == true && fragmentsArray[p][sp].length > 0 && fr[p][sp] < fragmentsArray[p][sp].length - 1 && toTop != true && io == false)
			{
				_showFragment(p, sp);
			}
			else
			{
				sub = 0;
				if (toTop == true && p + 1 < sectionsArray.length - 1)
				{
					sub = 0;
				}
				else if (toTop != true || _fragmentsOnBack == true || p + 1 > sectionsArray.length - 1)
				{
					sub = sp;
				}
				p = Math.min(p + 1, sectionsArray.length - 1);
				return _getNearestPage(sectionsArray[p], sub, io);
			}
			return hiliteOrNavigate(sectionsArray[p][sp], io);
		}
		
		/**
		 * returns the prev section in navigation
		 * @param	top	Boolean	if true the next section will be the first page in the prev array; if false the prev section will be the same index page in the prev array
		 * @param	fos	Boolean value of _fragmentsOnSide
		 * @param	io	Boolean	value of isOverview
		 */
		function _getPrevSection(top, fos, io)
		{
			var sub = sp;
			var toTop = top == !_sectionsSlideToTop;
			if (fos == true && fragmentsArray[p][sp].length > 0 && fr[p][sp] >= 0 && toTop != true && io == false)
			{
				_hideFragment(p, sp);
			}
			else
			{
				var sub = 0;
				sub = 0;
				if (toTop == true && p - 1 >= 0)
				{
					sub = 0;
				}
				else if (toTop != true || _fragmentsOnBack == true || p - 1 < 0)
				{
					sub = sp;
				}
				p = Math.max(p - 1, 0);
				return _getNearestPage(sectionsArray[p], sub, io);
			}
			return hiliteOrNavigate(sectionsArray[p][sp], io);
		}
		
		/**
		 * checks if there is a valid page in the current section array
		 * if the passed page is not valid thne check which is the first valid page in the array
		 * then returns the page
		 * @param	p	Number	the section index in the sections array
		 * @param	sub	Number	the page index in the sections->page array
		 * @param	io	Boolean	value of isOverview
		 */
		function _getNearestPage(pg, sub, io)
		{
			var nsp = pg[sub];
			if (nsp == undefined)
			{
				for (var i = sub; i >= 0; i--)
				{
					if (pg[i] != undefined)
					{
						nsp = pg[i];
						sub = i;
						break;
					}
				}
			}
			sp = sub;
			if (!isOverview)
			{
				_updateFragments();
			}
			return hiliteOrNavigate(nsp, io);
		}
		
		/**
		 * returns the next page in navigation
		 * if the next page is not in the current section array returns the first page in the next section array
		 * @param	jump	Boolean	if true jumps over the fragments directly to the next page
		 * @param	io	Boolean	value of isOverview
		 */
		function _getNextPage(jump, io)
		{
			if (fragmentsArray[p][sp].length > 0 && fr[p][sp] < fragmentsArray[p][sp].length - 1 && jump != true && io == false)
			{
				_showFragment(p, sp);
			}
			else
			{
				if (sectionsArray[p][sp + 1] == undefined && sectionsArray[p + 1] != undefined)
				{
					p += 1;
					sp = 0;
				}
				else
				{
					sp = Math.min(sp + 1, sectionsArray[p].length - 1);
				}
			}
			return hiliteOrNavigate(sectionsArray[p][sp], io);
		}
		
		/**
		 * returns the prev page in navigation
		 * if the prev page is not in the current section array returns the last page in the prev section array
		 * @param	jump	Boolean	if true jumps over the fragments directly to the prev page
		 * @param	io	Boolean	value of isOverview
		 */
		function _getPrevPage(jump, io)
		{
			if (fragmentsArray[p][sp].length > 0 && fr[p][sp] >= 0 && jump != true && io == false)
			{
				_hideFragment(p, sp);
			}
			else
			{
				if (sp == 0 && sectionsArray[p - 1] != undefined)
				{
					p -= 1;
					sp = sectionsArray[p].length - 1;
				}
				else
				{
					sp = Math.max(sp - 1, 0);
				}
			}
			return hiliteOrNavigate(sectionsArray[p][sp], io);
		}

		/**
		 * returns the destination page or
		 * if the application is in overview mode
		 * switch the active page without returning a destination
		 * @param	d	HTMLElement	the candidate destination
		 * @param	io	Boolean	value of isOverview
		 */
		function hiliteOrNavigate(d, io)
		{
			if (io == true)
			{
				_switchActivePage(d);
				return;
			}
			else
			{
				return d;
			}
		}

		/**
		 * show a single fragment inside the specified section / page
		 * the fragment index parameter is optional, if passed force the specified fragment to show
		 * otherwise the method shows the current fragment
		 * @param	fp	Number	the section index
		 * @param	fsp	Number	the page index
		 * @param	f	Number	the fragment index (optional)
		 */
		function _showFragment(fp, fsp, f)
		{
			if (f != undefined)
			{
				fr[fp][fsp] = f;
			}
			else
			{
				f = fr[fp][fsp] += 1;
			}
			for (var i = 0; i <= f; i++)
			{
				Brav1Toolbox.addClass(fragmentsArray[fp][fsp][i], FRAGMENT_REVEALED_CLASS);
				Brav1Toolbox.removeClass(fragmentsArray[fp][fsp][i], FRAGMENT_ACTUAL_CLASS);
			}
			Brav1Toolbox.addClass(fragmentsArray[fp][fsp][f], FRAGMENT_ACTUAL_CLASS);
		}

		/**
		 * hide a single fragment inside the specified section / page
		 * the fragment index parameter is optional, if passed force the specified fragment to hide
		 * otherwise the method hides the current fragment
		 * @param	fp	Number	the section index
		 * @param	fsp	Number	the page index
		 * @param	f	Number	the fragment index (optional)
		 */
		function _hideFragment(fp, fsp, f)
		{
			if (f != undefined)
			{
				fr[fp][fsp] = f;
			}
			else
			{
				f = fr[fp][fsp];
			}
			for (var i = 0; i < fragmentsArray[fp][fsp].length; i++)
			{
				if (i >= f)
				{
					Brav1Toolbox.removeClass(fragmentsArray[fp][fsp][i], FRAGMENT_REVEALED_CLASS);
					Brav1Toolbox.removeClass(fragmentsArray[fp][fsp][i], FRAGMENT_REVEALED_TEMP_CLASS);
				}
				Brav1Toolbox.removeClass(fragmentsArray[fp][fsp][i], FRAGMENT_ACTUAL_CLASS);
			}
			f -= 1;
			if (f >= 0)
			{
				Brav1Toolbox.addClass(fragmentsArray[fp][fsp][f], FRAGMENT_ACTUAL_CLASS);
			}
			fr[fp][fsp] = f;
		}

		/**
		 * show all the fragments or the fragments in the specified page
		 * adds a temporary class which does not override the current status of fragments
		 */
		function _showFragments()
		{
			for (var i = 0; i < fragments.length; i++)
			{
				Brav1Toolbox.addClass(fragments[i], FRAGMENT_REVEALED_TEMP_CLASS);
			}
		}

		/**
		 * hide all the fragments or the fragments in the specified page
		 * removes a temporary class which does not override the current status of fragments
		 */
		function _hideFragments()
		{
			for (var i = 0; i < fragments.length; i++)
			{
				Brav1Toolbox.removeClass(fragments[i], FRAGMENT_REVEALED_TEMP_CLASS);
			}
		}

		function _updateFragments()
		{
			for (var ip = 0; ip < fragmentsArray.length; ip++)
			{
				var frp = fragmentsArray[ip];
				for (var isp = 0; isp < frp.length; isp++)
				{
					var frsp = frp[isp];
					if (frsp.length > 0)
					{
						// there are fragments
						if (ip > p)
						{
							// previous section
							for (var f = frsp.length - 1; f >= 0; f--)
							{
								_hideFragment(ip, isp, f);
							}
						}
						else if (ip < p)
						{
							// next section
							for (var f = 0; f < frsp.length; f++)
							{
								_showFragment(ip, isp, f);
							}
						}
						else if (ip == p)
						{
							// same section
							if (isp > sp)
							{
								// previous page
								for (var f = frsp.length - 1; f >= 0; f--)
								{
									_hideFragment(ip, isp, f);
								}
							}
							else if (isp < sp)
							{
								// next page
								for (var f = 0; f < frsp.length; f++)
								{
									_showFragment(ip, isp, f);
								}
							}
							else if (isp == sp)
							{	
								// same page
								if (_fragmentsOnBack == true && (pastIndex.section > NavigationMatrix.getPageIndex().section || pastIndex.page > NavigationMatrix.getPageIndex().page))
								{
									for (var f = 0; f < frsp.length; f++)
									{
										_showFragment(ip, isp, f);
									}
								}
								else
								{
									for (var f = frsp.length - 1; f >= 0; f--)
									{
										_hideFragment(ip, isp, f);
									}
								}
								if (_fragmentsOnBack == false)
								{
									fr[ip][isp] = -1
								}
								else 
								{
									if (pastIndex.section > NavigationMatrix.getPageIndex().section || pastIndex.page > NavigationMatrix.getPageIndex().page)
									{
										fr[ip][isp] = frsp.length - 1;	
									}
									else
									{
										fr[ip][isp] = -1
									}
								}
							}
						}
					}
				}
			}
		}
		
		/**
		 * returns the current section index
		 */
		function _getSection(h)
		{
			if (h)
			{
				// TODO return the index of the section by hash
			}
			return p;
		}
		
		/**
		 * returns the current page index
		 */
		function _getPage(h)
		{
			if (h)
			{
				// TODO return the index of the page by hash
			}
			return sp;
		}

		/**
		 * returns the sections collection
		 */
		 function _getSections()
		 {
		 	return sections;
		 }

		/**
		 * returns the pages collection inside the passed section index
		 */
		 function _getPages(i)
		 {
		 	return sectionsArray[i];
		 }

		/**
		 * returns the pages collection of all pages in the presentation
		 */
		 function _getAllPages()
		 {
		 	return allPages;
		 }

		/**
		 * returns the number of sections
		 */
		function _getSectionsLength()
		{
			return sectionsLength;
		}

		/**
		 * returns the max number of pages
		 */
		function _getPagesLength()
		{
			return pagesLength;
		}

		/**
		 * returns the total number of pages
		 */
		function _getPagesTotalLength()
		{
			return pagesTotalLength;
		}

		/**
		 * returns a object with the index of the current section and page
		 */
		function _getPageIndex(d)
		{
			var pIndex = p;
			var spIndex = sp;
			if (d != undefined)
			{
				pIndex = d.parentNode.index; //parseInt(d.parentNode.getAttribute("data-prog").replace(/__/, "")) - 1;
				spIndex = d.index; //parseInt(d.getAttribute("data-prog").replace(/__/, "")) - 1;
			}
			return { section: pIndex, page: spIndex };
		}

		function _getSectionByIndex(i)
		{
			return sections[i];
		}

		function _getPageByIndex(i, pi)
		{
			return sectionsArray[pi][i];
		}

		function _getCurrentSection()
		{
			return sections[p];
		}

		function _getCurrentPage()
		{
			return sectionsArray[p][sp];
		}

		function _getCurrentFragment()
		{
			return fragmentsArray[p][sp][_getCurrentFragmentIndex()];
		}

		function _getCurrentFragmentIndex()
		{
			return fr[p][sp];
		}

		function _hasNextSection()
		{
			return p < sections.length - 1;
		}

		function _hasPrevSection()
		{
			return p > 0;
		}

		function _hasNextPage()
		{
			return sp < sectionsArray[p].length - 1;
		}

		function _hasPrevPage()
		{
			return sp > 0;
		}

		/**
		 * get a progress value calculated on the total number of pages
		 */
		function _getProgress()
		{
			if (p == 0 && sp == 0)
			{
				return 0;
			}
			var c = 0;
			for (var i = 0; i < p; i++)
			{
				c += sectionsArray[i].length;
			}
			c += sectionsArray[p][sp].index + 1;
			return c;
		}

		/**
		 * get a composed hash based on current section and page
		 */
		function _getHash(d)
		{
			if (d != undefined)
			{
				sp = _getPageIndex(d).page;
				p = _getPageIndex(d).section;
			}
			var h = "";
			// append to h the value of data-id attribute or, if data-id is not defined, the data-prog attribute
			var _p = sections[p];
			h += getPageId(_p);
			if (sectionsArray[p].length > 1)
			{
				var _sp = sectionsArray[p][sp];
				h += "/" + getPageId(_sp);
			}
			return h;
		}
		
		/**
		 * expose the method to set the page from a hash
		 */
		function _setPage(h)
		{
			var elem = getElementByHash(h);
			if (elem)
			{
				var pElem = elem.parentNode;
				for (var i = 0; i < sectionsArray.length; i++)
				{
					var pa = sectionsArray[i];
					if (sections[i] === pElem)
					{
						p = i;
						for (var ii = 0; ii < pa.length; ii++)
						{
							if (pa[ii] === elem)
							{
								sp = ii;
								break;
							}
						}
					}
				}
				_updateFragments();
			}
			return elem;
		}

		function _switchActivePage(d, navigate)
		{
			var sIndex = d.parentNode.index;
			for (var i = 0; i < sectionsArray.length; i++)
			{
				var pa = sectionsArray[i];
				for (var ii = 0; ii < pa.length; ii++)
				{
					var spa = pa[ii];
					//
					Brav1Toolbox.removeClass(spa, "past-section");
					Brav1Toolbox.removeClass(spa, "future-section");
					Brav1Toolbox.removeClass(spa, "past-page");
					Brav1Toolbox.removeClass(spa, "future-page");
					//
					if (spa !== d)
					{
						Brav1Toolbox.removeClass(spa, "hilite");
						if (isOverview == false && spa !== _getCurrentPage())
						{
							Brav1Toolbox.removeClass(spa, "actual");
						}
						if (i < sIndex)
						{
							Brav1Toolbox.addClass(spa, "past-section");
						}
						else if (i > sIndex)
						{
							Brav1Toolbox.addClass(spa, "future-section");
						}
						if (spa.index < d.index)
						{
							Brav1Toolbox.addClass(spa, "past-page");
						}
						else if (spa.index > d.index)
						{
							Brav1Toolbox.addClass(spa, "future-page");	
						}
					}
				}
			}
			Brav1Toolbox.addClass(d, "hilite");
			if (navigate)
			{
				setActual(d);
			}
			hilited = d;
		}

		function _getCurrentHilited()
		{
			return hilited;
		}

		function setActual(d)
		{
			Brav1Toolbox.addClass(d, "actual");
		}
		
		_updateMatrix(); // update the navigation matrix on the first run
		
		return {
			update: _updateMatrix,
			updateFragments: _updateFragments,
			showFragments: _showFragments,
			hideFragments: _hideFragments,
			getSection: _getSection,
			getPage: _getPage,
			getSections: _getSections,
			getPages: _getPages,
			getAllPages: _getAllPages,
			getNextSection: _getNextSection,
			getPrevSection: _getPrevSection,
			getNextPage: _getNextPage,
			getPrevPage: _getPrevPage,
			getSectionsLength: _getSectionsLength,
			getPagesLength: _getPagesLength,
			getPagesTotalLength: _getPagesTotalLength,
			getPageIndex: _getPageIndex,
			getSectionByIndex: _getSectionByIndex,
			getPageByIndex: _getPageByIndex,
			getCurrentSection: _getCurrentSection,
			getCurrentPage: _getCurrentPage,
			getCurrentFragment: _getCurrentFragment,
			getCurrentFragmentIndex: _getCurrentFragmentIndex,
			getProgress: _getProgress,
			getHash: _getHash,
			setPage: _setPage,
			switchActivePage: _switchActivePage,
			getCurrentHilited: _getCurrentHilited,
			hasNextSection: _hasNextSection,
			hasPrevSection: _hasPrevSection,
			hasNextPage: _hasNextPage,
			hasPrevPage: _hasPrevPage,
			updateOffsets: _updateOffsets,
			getParallaxElements: _getParallaxElements
		}
	})();

/*
	##    ##    ###    ##     ## ####  ######      ###    ######## ####  #######  ##    ##    ######## ##     ## ######## ##    ## ########  ######  
	###   ##   ## ##   ##     ##  ##  ##    ##    ## ##      ##     ##  ##     ## ###   ##    ##       ##     ## ##       ###   ##    ##    ##    ## 
	####  ##  ##   ##  ##     ##  ##  ##         ##   ##     ##     ##  ##     ## ####  ##    ##       ##     ## ##       ####  ##    ##    ##       
	## ## ## ##     ## ##     ##  ##  ##   #### ##     ##    ##     ##  ##     ## ## ## ##    ######   ##     ## ######   ## ## ##    ##     ######  
	##  #### #########  ##   ##   ##  ##    ##  #########    ##     ##  ##     ## ##  ####    ##        ##   ##  ##       ##  ####    ##          ## 
	##   ### ##     ##   ## ##    ##  ##    ##  ##     ##    ##     ##  ##     ## ##   ###    ##         ## ##   ##       ##   ###    ##    ##    ## 
	##    ## ##     ##    ###    ####  ######   ##     ##    ##    ####  #######  ##    ##    ########    ###    ######## ##    ##    ##     ######  
*/
	/**
	 * add a listener for event delegation
	 * used for navigation purposes
	 */
	if (browserSupport)
	{
		if (isTouchDevice)
		{
			Brav1Toolbox.addListener(document, "touchend", onNavClick, false);
		}
		else
		{
			Brav1Toolbox.addListener(document, "click", onNavClick, false);
		}
	}

	function onNavClick(e)
	{
		var href = e.target.getAttribute("href");
		// links with href starting with #
		if (href && href.substr(0,1) == "#")
		{
			e.target.blur();
			e.preventDefault();
			var h = href;
			var dest = NavigationMatrix.setPage(h);
			navigateTo(dest, true, true);
		}
		// pages in oveview mode
		if (isOverview)
		{
			var dest = e.target;
			while (dest && !Brav1Toolbox.hasClass(dest, PAGE_CLASS))
			{
				dest = dest.parentNode;
			}
			if (Brav1Toolbox.hasClass(dest, PAGE_CLASS))
			{
				e.preventDefault();
				navigateTo(dest, null, true);
			}
		}
		// thumbs in the default progress indicator
		if (Brav1Toolbox.hasClass(e.target, PAGE_THUMB_CLASS))
		{
			e.preventDefault();
			var pTo = Number(unsafeAttr(e.target.getAttribute("data-section")));
			var spTo = Number(unsafeAttr(e.target.getAttribute("data-page")));
			_gotoPage(pTo, spTo);
		}
	}

	/**
	 * set callback for onpopstate event
	 * uses native history API to manage navigation
	 * but uses the # for client side navigation on return
	 */
	if (useHash == false && window.history.pushState)
	{
		window.onpopstate = onPopState;
	}
	else
	{
		useHash = true;
	}
	//
	function onPopState(e)
	{
		useHash = false;
		var h;
		if (e.state)
		{
			h = e.state.token.replace("#/", "");
		}
		else
		{
			h = document.location.hash.replace("#/", "");
		}
		var dest = NavigationMatrix.setPage(h);
		navigateTo(dest, false);
	}

	/**
	 * set callback for hashchange event
	 * this callback is used not only when onpopstate event wasn't available
	 * but also when the user resize the window or for the firs visit on the site
	 */
	Brav1Toolbox.addListener(window, "hashchange", onHashChange);
	//
	/**
	 * @param	e	Event	the hashChange Event
	 * @param	d	Boolean	force the hash change
	 */
	function onHashChange(e, d)
	{
		if (useHash || d)
		{
			var h = document.location.hash.replace("#/", "");
			var dest = NavigationMatrix.setPage(h);
			navigateTo(dest, false);
		}
	}

/*
	########  #######  ##     ##  ######  ##     ## 
	   ##    ##     ## ##     ## ##    ## ##     ## 
	   ##    ##     ## ##     ## ##       ##     ## 
	   ##    ##     ## ##     ## ##       ######### 
	   ##    ##     ## ##     ## ##       ##     ## 
	   ##    ##     ## ##     ## ##    ## ##     ## 
	   ##     #######   #######   ######  ##     ## 
*/

	var _ftX = ftContainer.offsetX;
	var _ftY = 0;
	var _touchStartX = 0;
	var _touchStartY = 0;
	var _deltaX = 0;
	var _deltaY = 0;
	var _dragging = 0;
	var _dragAxis = "x";
	var _swipeLimit = 100;

	html.addEventListener("touchstart", onTouchStart, false);
	html.addEventListener("touchmove",  onTouchMove, false);
	html.addEventListener("touchend",   onTouchEnd, false);

	function onTouchStart(e)
	{
		_deltaX = 0;
		_deltaY = 0;
		e.preventDefault();
		e = getTouchEvent(e);
		_touchStartX = e.clientX;
		_touchStartY = e.clientY;
		_dragging = 1;
		var initOffset = getInitOffset();
		_ftX = initOffset.x;
		_ftY = initOffset.y;
	}

	function onTouchMove(e)
	{
		e.preventDefault();
		e = getTouchEvent(e);
		_deltaX = e.clientX - _touchStartX;
		_deltaY = e.clientY - _touchStartY;
	}

	function onTouchEnd(e)
	{
		// e.preventDefault();
		e = getTouchEvent(e);
		_dragging = 0;
		_dragAxis = Math.abs(_deltaX) >= Math.abs(_deltaY) ? "x" : "y";
		if (_dragAxis == "x" && Math.abs(_deltaX) >= _swipeLimit)
		{
			if (_deltaX > 0)
			{
				_prevSection();
				return;
			}
			else if (_deltaX < 0)
			{
				_nextSection();
				return;
			}
		}
		else
		{
			if (_deltaY > 0 && Math.abs(_deltaY) >= _swipeLimit)
			{
				_prevPage();
				return;
			}
			else if (_deltaY < 0)
			{
				_nextPage();
				return;
			}
		}

	}

	function getTouchEvent(e)
	{
		if (e.touches)
		{
      		e = e.touches[0];
      	}
      	return e;
    }

    function getInitOffset()
    {
    	var off = ftContainer.style[Brav1Toolbox.getPrefixed("transform")];
    	// X
    	var indexX = off.indexOf("translateX(") + 11;
    	var offX = off.substring(indexX, off.indexOf(")", indexX));
    	if (offX.indexOf("%") != -1)
    	{
    		offX = offX.replace("%", "");
    		offX = (parseInt(offX) / 100) * window.innerWidth;
    	}
    	else if (offX.indexOf("px") != -1)
    	{
    		offX = parseInt(offX.replace("px", ""));
    	}
    	// Y
    	var indexY = off.indexOf("translateY(") + 11;
    	var offY = off.substring(indexY, off.indexOf(")", indexY));
    	if (offY.indexOf("%") != -1)
    	{
    		offY = offY.replace("%", "");
    		offY = (parseInt(offY) / 100) * window.innerHeight;
    	}
    	else if (offY.indexOf("px") != -1)
    	{
    		offY = parseInt(offY.replace("px", ""));
    	}
    	return { x:offX, y:offY };
    }

/*
	 ######   ######  ########   #######  ##       ##       
	##    ## ##    ## ##     ## ##     ## ##       ##       
	##       ##       ##     ## ##     ## ##       ##       
	 ######  ##       ########  ##     ## ##       ##       
	      ## ##       ##   ##   ##     ## ##       ##       
	##    ## ##    ## ##    ##  ##     ## ##       ##       
	 ######   ######  ##     ##  #######  ######## ######## 
*/

	/**
	 * native scroll management
	 */
	var scrollEventEnabled = true;

	Brav1Toolbox.addListener(window, "scroll", onNativeScroll);

	function onNativeScroll(e)
	{
		e.preventDefault();
		resetScroll();
	}

/*
	########  ########  ######  #### ######## ######## 
	##     ## ##       ##    ##  ##       ##  ##       
	##     ## ##       ##        ##      ##   ##       
	########  ######    ######   ##     ##    ######   
	##   ##   ##             ##  ##    ##     ##       
	##    ##  ##       ##    ##  ##   ##      ##       
	##     ## ########  ######  #### ######## ######## 
*/

	/**
	 * monitoring function that triggers hashChange when resizing window
	 */
	var resizeMonitor = (function _resizeMonitor()
	{
		var ticker = NaN;
		function _enable()
		{
			_disable();
			if (!isOverview)
			{
				ticker = setTimeout(doResizeHandler, 300);
			}
		}
		
		function _disable()
		{
			clearTimeout(ticker);
		}
		
		function doResizeHandler()
		{
			NavigationMatrix.updateOffsets();
			navigateTo();
		}
		
		Brav1Toolbox.addListener(window, "resize", _enable);
		window.addEventListener("orientationchange", _enable, false);
		
		return {
			enable: _enable,
			disable: _disable,
		}
	})();

/*
	##     ## ######## #### ##        ######  
	##     ##    ##     ##  ##       ##    ## 
	##     ##    ##     ##  ##       ##       
	##     ##    ##     ##  ##        ######  
	##     ##    ##     ##  ##             ## 
	##     ##    ##     ##  ##       ##    ## 
	 #######     ##    #### ########  ######  
*/

	/**
	 * returns the element by parsing the hash
	 * @param h String	the hash string to evaluate
	 */
	function getElementByHash(h)
	{
		if (h.length > 0)
		{
			var aHash = h.replace("#/", "").split("/"); // TODO considerare l'ultimo slash come nullo
			var p = document.querySelector(SECTION_SELECTOR + "[data-id=__" + aHash[0] + "]") || document.querySelector(SECTION_SELECTOR + "[data-prog=__" + aHash[0] + "]");
			if (p != null)
			{
				var sp = null;
				if (aHash.length > 1)
				{
					sp = p.querySelector(PAGE_SELECTOR + "[data-id=__" + aHash[1] + "]") || p.querySelector(PAGE_SELECTOR + "[data-prog=__" + aHash[1] + "]");
				}
				if (sp == null)
				{
					sp = p.querySelector(PAGE_SELECTOR);
				}
				return sp;
			}
		}
		return;
	}
	
	/**
	 * public method to force navigation updates
	 */
	function _updateNavigation()
	{
		NavigationMatrix.update();
		onHashChange(null, true);
	}

	/**
	 * builds and sets the title of the document parsing the attributes of the current section
	 * if a data-title is available in a page and or in a section then it will be used
	 * otherwise it will be used a formatted version of the hash string
	 */
	function setTitle(h)
	{
		var t = siteName;
		var ht = NavigationMatrix.getCurrentPage().getAttribute("data-title");
		if (ht == null)
		{
			var hs = h.split("/");
			for (var i = 0; i < hs.length; i++)
			{
				t += " | " + hs[i];
			}
		}
		else
		{
			if (NavigationMatrix.getCurrentSection().getAttribute("data-title") != null)
			{
				t += " | " + NavigationMatrix.getCurrentSection().getAttribute("data-title");
			}
			t += " | " + ht
		}
		document.title = t;
	}

	/**
	 * returns a clean string of navigation atributes of the passed page
	 * if there is a data-id attribute it will be returned
	 * otherwise will be returned the data-prog attribute
	 */
	function getPageId(d)
	{
		return (d.getAttribute("data-id") != null ? d.getAttribute("data-id").replace(/__/, "") : d.getAttribute("data-prog").replace(/__/, ""));
	}

	/**
	 * returns a safe version of an attribute value
	 * adding __ in front of the value
	 */
	function safeAttr(a)
	{
		if (a.substr(0,2) != "__")
		{
			return "__" + a;
		}
		else
		{
			return a;
		}
	}

	/**
	 * clean the save value of an attribute
	 * removing __ from the beginning of the value
	 */
	function unsafeAttr(a)
	{
		if (a.substr(0,2) == "__")
		{
			return a.replace(/__/, "");
		}
		else
		{
			return a;
		}
	}

/*
	##    ##    ###    ##     ## ####  ######      ###    ######## ######## ########  #######  
	###   ##   ## ##   ##     ##  ##  ##    ##    ## ##      ##    ##          ##    ##     ## 
	####  ##  ##   ##  ##     ##  ##  ##         ##   ##     ##    ##          ##    ##     ## 
	## ## ## ##     ## ##     ##  ##  ##   #### ##     ##    ##    ######      ##    ##     ## 
	##  #### #########  ##   ##   ##  ##    ##  #########    ##    ##          ##    ##     ## 
	##   ### ##     ##   ## ##    ##  ##    ##  ##     ##    ##    ##          ##    ##     ## 
	##    ## ##     ##    ###    ####  ######   ##     ##    ##    ########    ##     #######  
*/

	/**
	 * navigation transition logic
	 * @param	dest HTMLElement	the page to go to
	 * @param	push Boolean if true the hash string were pushed to the history API
	 * @param	linked Boolean if true triggers a forced update of all the fragments in the pages, used when navigating from links or overview
	 */
	function navigateTo(dest, push, linked)
	{
		push = push == false ? push : true;
		// if dest doesn't exist then go to homepage
		if (!dest)
		{
			if (NavigationMatrix.getCurrentPage() != null)
			{
				dest = NavigationMatrix.getCurrentPage();
			}
			else
			{
				dest = document.querySelector(PAGE_SELECTOR);
			}
			push = true;
		}
		// checks what properties use for navigation and set the style
		navigate(dest);
		//
		moveParallax(dest);
		//
		if (isOverview)
		{
			_toggleOverview(false, false);
		}
		//
		var h = NavigationMatrix.getHash(dest);
		if (linked == true)
		{
			NavigationMatrix.updateFragments();
		}
		// set history properties
		var pageIndex = NavigationMatrix.getPageIndex(dest);
		if (pastIndex.section != pageIndex.section || pastIndex.page != pageIndex.page)
		{
			if (pushHistory != null && push != false && NavigationMatrix.getCurrentFragmentIndex() == -1)
			{
				var stateObj = { token: h };
				var nextHash = "#/" + h;
				currentHash = nextHash;
				window.history.pushState(stateObj, null, currentHash);
			}
			else
			{
				document.location.hash = "/" + h;
			}
		}
		// set the title
		setTitle(h);
		//
		// dispatches an event populated with navigation data
		fireNavigationEvent();
		// cache the section and page index, useful to determine the direction of the next navigation
		pastIndex = pageIndex;
		NavigationMatrix.switchActivePage(dest, true);
		//
		if (_showProgress)
		{
			updateProgress();
		}

	}

	function fireNavigationEvent()
	{
		var pageIndex = NavigationMatrix.getPageIndex();
		Brav1Toolbox.dispatchEvent(NAVIGATION_EVENT,	{
													section: 			NavigationMatrix.getCurrentSection(),
													page: 				NavigationMatrix.getCurrentPage(),
													sectionIndex: 		pageIndex.section, 
													pageIndex: 			pageIndex.page,
													pastSectionIndex: 	pastIndex.section,  
													pastPageIndex: 		pastIndex.page,  
													prevSection: 		NavigationMatrix.hasPrevSection(),
													nextSection: 		NavigationMatrix.hasNextSection(),
													prevPage: 			NavigationMatrix.hasPrevPage(),
													nextPage: 			NavigationMatrix.hasNextPage(),
													fragment: 			NavigationMatrix.getCurrentFragment(),
													fragmentIndex: 		NavigationMatrix.getCurrentFragmentIndex(),
													isOverview: 		isOverview, 
													progress: 			NavigationMatrix.getProgress(),
													total: 				NavigationMatrix.getPagesTotalLength()
												} );
	}

	/**
	 * check the availability of transform CSS property
	 * if transform is not available then fallbacks to position absolute behaviour
	 */
	function navigate(dest)
	{
		var x;
		var y;
		var pageIndex = NavigationMatrix.getPageIndex(dest);
		if (_slideInPx == true)
		{
			// calculate the coordinates of the destination
			x = dest.x;
			y = dest.y;
		}
		else
		{
			// calculate the index of the destination page
			x = pageIndex.section;
			y = pageIndex.page;
		}
		//
		if (Brav1Toolbox.testCSS("transform"))
		{
			if (_slideInPx)
			{
				ftContainer.style[Brav1Toolbox.getPrefixed("transform")] = "translateX(" + -x + "px) translateY(" + -y + "px)";	
			}
			else
			{
				ftContainer.style[Brav1Toolbox.getPrefixed("transform")] = "translateX(" + -x * 100 + "%) translateY(" + -y * 100 + "%)";
			}
		}
		else
		{
			if (_slideInPx)
			{
				ftContainer.style.top = -y + "px";
				ftContainer.style.left = -x + "px";
			}
			else
			{
				ftContainer.style.top = -y * 100 + "%";
				ftContainer.style.left = -x * 100 + "%";
			}
		}
		resetScroll();
	}

	function moveParallax(dest)
	{
		if (parallaxEnabled)
		{
			var pageIndex = NavigationMatrix.getPageIndex(dest);

			var pxElements = NavigationMatrix.getParallaxElements();
			for (var i = 0; i < pxElements.length; i++)
			{
				var pxSection = pxElements[i];
				if (pxSection != undefined)
				{
					for (var ii = 0; ii < pxSection.length; ii++)
					{
						var pxPage = pxSection[ii];
						if (pxPage != undefined)
						{
							for (var iii = 0; iii < pxPage.length; iii++)
							{
								var pxElement = pxPage[iii]
								var pX = 0;
								var pY = 0;
								// sections
								if (pageIndex.section < i)
								{
									pX = pxElement.pX;
								}
								else if (pageIndex.section > i)
								{
									pX = -pxElement.pX;	
								}
								// pages
								if (pageIndex.page < ii)
								{
									pY = pxElement.pY;
								}
								else if (pageIndex.page > ii)
								{
									pY = -pxElement.pY;	
								}
								// animation
								if (_parallaxInPx)
								{
									pxElement.style[Brav1Toolbox.getPrefixed("transform")] = "translateX(" + pX + "px) translateY(" + pY + "px)";
								}
								else
								{
									pxElement.style[Brav1Toolbox.getPrefixed("transform")] = "translateX(" + pX + "%) translateY(" + pY + "%)";
								}
							}
						}
					}
				}
			}
		}
	}

	function resetScroll()
	{
		window.scrollTo(0,0); // fix the eventually occurred page scrolling resetting the scroll values to 0
	}

/*
	########  ########   #######   ######   ########  ########  ######   ######  
	##     ## ##     ## ##     ## ##    ##  ##     ## ##       ##    ## ##    ## 
	##     ## ##     ## ##     ## ##        ##     ## ##       ##       ##       
	########  ########  ##     ## ##   #### ########  ######    ######   ######  
	##        ##   ##   ##     ## ##    ##  ##   ##   ##             ##       ## 
	##        ##    ##  ##     ## ##    ##  ##    ##  ##       ##    ## ##    ## 
	##        ##     ##  #######   ######   ##     ## ########  ######   ######  
*/
	var defaultProgress = null;
	var progressFill = null;

	function buildProgressIndicator()
	{
		var domFragment = document.createDocumentFragment();
		// create the progress container div
		defaultProgress = document.createElement("div");
		defaultProgress.className = DEFAULT_PROGRESS_CLASS;
		domFragment.appendChild(defaultProgress);
		// loop through sections
		for (var i = 0; i < NavigationMatrix.getSectionsLength(); i++)
		{
			var pDiv = document.createElement("div");
				pDiv.setAttribute("data-section", "__" + i);
				pDiv.className = SECTION_THUMB_CLASS;
				Brav1Toolbox.addClass(pDiv, "thumb-section-" + i);
			// loop through pages
			var spArray = NavigationMatrix.getPages(i)
			for (var ii = 0; ii < spArray.length; ii++) {
				var spDiv = document.createElement("div");
					spDiv.className = PAGE_THUMB_CLASS;
					spDiv.setAttribute("data-section", "__" + i);
					spDiv.setAttribute("data-page", "__" + ii);
					Brav1Toolbox.addClass(spDiv, "thumb-page-" + ii);
					pDiv.appendChild(spDiv);
			};
			defaultProgress.appendChild(pDiv);
		};
		body.appendChild(defaultProgress);
	}

	function hideProgressIndicator()
	{
		if (defaultProgress != null)
		{
			body.removeChild(defaultProgress);
			defaultProgress = null;
		}
	}

	function updateProgress()
	{
		if (defaultProgress != null)
		{
			var spts = defaultProgress.querySelectorAll(PAGE_THUMB_SELECTOR);
			for (var i = 0; i < spts.length; i++)
			{
				var spt = spts[i];
				var pTo = Number(unsafeAttr(spt.getAttribute("data-section")));
				var spTo = Number(unsafeAttr(spt.getAttribute("data-page")));
				if (pTo == NavigationMatrix.getPageIndex().section && spTo == NavigationMatrix.getPageIndex().page)
				{
					Brav1Toolbox.addClass(spts[i], "actual");
				}
				else
				{
					Brav1Toolbox.removeClass(spts[i], "actual");
				}
			}

		}
	}

	function _getDefaultProgress()
	{
		return defaultProgress;
	}

/*
	 #######  ##     ## ######## ########  ##     ## #### ######## ##      ##    ##     ##    ###    ##    ##    ###     ######   ######## ##     ## ######## ##    ## ######## 
	##     ## ##     ## ##       ##     ## ##     ##  ##  ##       ##  ##  ##    ###   ###   ## ##   ###   ##   ## ##   ##    ##  ##       ###   ### ##       ###   ##    ##    
	##     ## ##     ## ##       ##     ## ##     ##  ##  ##       ##  ##  ##    #### ####  ##   ##  ####  ##  ##   ##  ##        ##       #### #### ##       ####  ##    ##    
	##     ## ##     ## ######   ########  ##     ##  ##  ######   ##  ##  ##    ## ### ## ##     ## ## ## ## ##     ## ##   #### ######   ## ### ## ######   ## ## ##    ##    
	##     ##  ##   ##  ##       ##   ##    ##   ##   ##  ##       ##  ##  ##    ##     ## ######### ##  #### ######### ##    ##  ##       ##     ## ##       ##  ####    ##    
	##     ##   ## ##   ##       ##    ##    ## ##    ##  ##       ##  ##  ##    ##     ## ##     ## ##   ### ##     ## ##    ##  ##       ##     ## ##       ##   ###    ##    
	 #######     ###    ######## ##     ##    ###    #### ########  ###  ###     ##     ## ##     ## ##    ## ##     ##  ######   ######## ##     ## ######## ##    ##    ##    
*/
	
	/**
	 * switch from the overview states
	 */
	function _toggleOverview(back, navigate)
	{
		if (isOverview)
		{
			zoomIn(back, navigate);
		}
		else
		{
			overviewCachedDest = NavigationMatrix.getCurrentPage();
			zoomOut();
		}
	}

	/**
	 * zoom in the view to focus on the current section / page
	 */
	function zoomIn(back, navigate)
	{
		isOverview = false;
		Brav1Toolbox.removeClass(body, "ft-overview");
		NavigationMatrix.hideFragments();
		navigate = navigate === false ? false : true;
		if (navigate == true)
		{
			if (back == true)
			{
				navigateTo(overviewCachedDest);
			}
			else
			{
				navigateTo();
			}
		}
	}

	/**
	 * zoom out the view for an overview of all the sections / pages
	 */
	function zoomOut()
	{
		isOverview = true;
		Brav1Toolbox.addClass(body, "ft-overview");
		NavigationMatrix.showFragments();
		//
		if (_useOverviewVariant == false)
		{
			overviewZoomTypeA(true);
		}
		else
		{
			overviewZoomTypeB(true);
		}
		fireNavigationEvent();
	}

	function overviewZoomTypeA(out)
	{	
		// ftContainer scale version
		if (out)
		{
			var scaleX = 100 / NavigationMatrix.getSectionsLength();
			var scaleY = 100 / NavigationMatrix.getPagesLength();
			var scale = Math.min(scaleX, scaleY) * 0.9;
			var offsetX = (100 - NavigationMatrix.getSectionsLength() * scale) / 2;
			var offsetY = (100 - NavigationMatrix.getPagesLength() * scale) / 2;
			ftContainer.style[Brav1Toolbox.getPrefixed("transform")] = "translate(" + offsetX + "%, " + offsetY + "%) scale(" + scale/100 + ", " + scale/100 + ")";
		}
	}

	function overviewZoomTypeB(out)
	{
		// ftContainer scale alternative version
		if (out)
		{
			var scale = overviewFixedScaleFactor // Math.min(scaleX, scaleY) * 0.9;
			var pIndex = NavigationMatrix.getPageIndex();
			var offsetX = 50 - (scale * pIndex.section) - (scale / 2);
			var offsetY = 50 - (scale * pIndex.page) - (scale / 2);
			ftContainer.style[Brav1Toolbox.getPrefixed("transform")] = "translate(" + offsetX + "%, " + offsetY + "%) scale(" + scale/100 + ", " + scale/100 + ")";
		}
	}

/*
	##    ## ######## ##    ## ########   #######     ###    ########  ########     ##    ##    ###    ##     ## ####  ######      ###    ######## ####  #######  ##    ## 
	##   ##  ##        ##  ##  ##     ## ##     ##   ## ##   ##     ## ##     ##    ###   ##   ## ##   ##     ##  ##  ##    ##    ## ##      ##     ##  ##     ## ###   ## 
	##  ##   ##         ####   ##     ## ##     ##  ##   ##  ##     ## ##     ##    ####  ##  ##   ##  ##     ##  ##  ##         ##   ##     ##     ##  ##     ## ####  ## 
	#####    ######      ##    ########  ##     ## ##     ## ########  ##     ##    ## ## ## ##     ## ##     ##  ##  ##   #### ##     ##    ##     ##  ##     ## ## ## ## 
	##  ##   ##          ##    ##     ## ##     ## ######### ##   ##   ##     ##    ##  #### #########  ##   ##   ##  ##    ##  #########    ##     ##  ##     ## ##  #### 
	##   ##  ##          ##    ##     ## ##     ## ##     ## ##    ##  ##     ##    ##   ### ##     ##   ## ##    ##  ##    ##  ##     ##    ##     ##  ##     ## ##   ### 
	##    ## ########    ##    ########   #######  ##     ## ##     ## ########     ##    ## ##     ##    ###    ####  ######   ##     ##    ##    ####  #######  ##    ## 
*/

	/**
	 * KEYBOARD NAVIGATION
	 */
	Brav1Toolbox.addListener(window, "keydown", onKeyDown);
	Brav1Toolbox.addListener(window, "keyup", onKeyUp);
	
	function onKeyDown(e)
	{
		var tag = e.target.tagName;
		if (tag != "INPUT" && tag != "TEXTAREA" && tag != "SELECT")
		{
			if (e.keyCode >= 37 && e.keyCode <= 40)
			{
				e.preventDefault();
			}
		}
	}
	
	function onKeyUp(e)
	{
		var tag = e.target.tagName;
		var elem;
		if (tag != "INPUT" && tag != "TEXTAREA" && tag != "SELECT")
		{
			e.preventDefault();
			switch (e.keyCode)
			{
				case 27 : // esc
					_toggleOverview(true);
					break;
				case 33 : // pag up
					_gotoTop();
					break;
				case 34 : // pag down
					_gotoBottom();
					break;
				case 35 : // end
					_gotoEnd();
					break;
				case 36 : // home
					_gotoHome();
					break;
				case 37 : // left
					_prevSection(e.shiftKey);
					break;
				case 39 : // right
					_nextSection(e.shiftKey);
					break;
				case 38 : // up
					_prevPage(e.shiftKey);
					break;
				case 40 : // down
					_nextPage(e.shiftKey);
					break;
				case 13 : // return
				{
					if (isOverview)
					{
						_gotoPage(NavigationMatrix.getCurrentHilited());
					}
					break;
				}
				default :
					break;
			}
		}
	}

/*
	########  ##     ## ########  ##       ####  ######        ###    ########  #### 
	##     ## ##     ## ##     ## ##        ##  ##    ##      ## ##   ##     ##  ##  
	##     ## ##     ## ##     ## ##        ##  ##           ##   ##  ##     ##  ##  
	########  ##     ## ########  ##        ##  ##          ##     ## ########   ##  
	##        ##     ## ##     ## ##        ##  ##          ######### ##         ##  
	##        ##     ## ##     ## ##        ##  ##    ##    ##     ## ##         ##  
	##         #######  ########  ######## ####  ######     ##     ## ##        #### 
*/

	
	/**
	 * triggers the first animation when visiting the site
	 * if the hash is not empty
	 */
	function _start()
	{
		// init and configuration
		if (_showProgress && defaultProgress == null)
		{
			buildProgressIndicator();
		}
		// start navigation
		if (document.location.hash.length > 0)
		{
			Brav1Toolbox.addClass(ftContainer, "no-transition");
			onHashChange(null, true);
			Brav1Toolbox.removeClass(ftContainer, "no-transition");
		}
		else
		{
			if (_start.arguments.length > 0)
			{
				_gotoPage.apply(this, _start.arguments);
			}
			else
			{
				_gotoPage(0,0);
				updateProgress();
			}
		}
	}	

	/*
	 * Public API to go to the next section
	 * @param	top	Boolean	if true the next section will be the first page in the next array; if false the next section will be the same index page in the next array
	 */
	function _nextSection(top)
	{
		var d = NavigationMatrix.getNextSection(top, _fragmentsOnSide, isOverview);
		if (d != undefined)
		{
			navigateTo(d);
		}
		else
		{
			if (isOverview && _useOverviewVariant)
			{
				zoomOut();
			}
		}
	}

	/*
	 * Public API to go to the prev section
	 * 
	 */
	function _prevSection(top)
	{
		var d = NavigationMatrix.getPrevSection(top, _fragmentsOnSide, isOverview);
		if (d != undefined)
		{
			navigateTo(d);
		}
		else
		{
			if (isOverview && _useOverviewVariant)
			{
				zoomOut();
			}
		}
	}

	/*
	 * Public API to go to the next page
	 */
	function _nextPage(jump)
	{
		var d = NavigationMatrix.getNextPage(jump, isOverview);
		if (d != undefined)
		{
			navigateTo(d);
		}
		else
		{
			if (isOverview && _useOverviewVariant)
			{
				zoomOut();
			}
		}
	}

	/*
	 * Public API to go to the prev page
	 */
	function _prevPage(jump)
	{
		var d = NavigationMatrix.getPrevPage(jump, isOverview);
		if (d != undefined)
		{
			navigateTo(d);
		}
		else
		{
			if (isOverview && _useOverviewVariant)
			{
				zoomOut();
			}
		}
	}

	/*
	 * Public API to go to a specified section / page
	 * the method accepts vary parameters:
	 * if two numbers were passed it assumes that the first is the section index and the second is the page index;
	 * if an object is passed it assumes that the object has a section property and a page property to get the indexes to navigate;
	 * if an HTMLElement is passed it assumes the element is a destination page 
	 */
	function _gotoPage()
	{
		var args = _gotoPage.arguments;
		if (args.length > 0)
		{
			if (args.length == 1)
			{
				
				if (Brav1Toolbox.typeOf(args[0]) === "Object")
				{
					var o = args[0];
					var p = o.section;
					var sp = o.page;
					if (p != null && p != undefined)
					{
						var pd = document.querySelector(SECTION_SELECTOR + "[data-id=" + safeAttr(p) + "]");
						if (sp != null && sp != undefined)
						{
							var spd = pd.querySelector(PAGE_SELECTOR + "[data-id=" + safeAttr(sp) + "]");
							if (spd != null)
							{
								navigateTo(spd);
								return;
							}
						}
					}
				}
				else if (args[0].nodeName != undefined)
				{
					navigateTo(args[0], null, true);
				}
			}
			if (Brav1Toolbox.typeOf(args[0]) === "Number" || args[0] === 0)
			{
				var spd = NavigationMatrix.getPageByIndex(args[1], args[0]);
				navigateTo(spd);
				return;
			}
		}
	}

	function _gotoHome()
	{
		_gotoPage(0,0);
	}

	function _gotoEnd()
	{
		var sl = NavigationMatrix.getSectionsLength() - 1;
		_gotoPage(sl, NavigationMatrix.getPages(sl).length - 1);
	}

	function _gotoTop()
	{
		var pageIndex = NavigationMatrix.getPageIndex();
		_gotoPage(pageIndex.section, 0);
	}

	function _gotoBottom()
	{
		var pageIndex = NavigationMatrix.getPageIndex();
		_gotoPage(pageIndex.section, NavigationMatrix.getPages(pageIndex.section).length - 1);
	}

	function _addEventListener(type, handler, useCapture)
	{
		Brav1Toolbox.addListener(document, type, handler, useCapture);
	}

/*
	 ######  ######## ######## ######## ######## ########   ######  
	##    ## ##          ##       ##    ##       ##     ## ##    ## 
	##       ##          ##       ##    ##       ##     ## ##       
	 ######  ######      ##       ##    ######   ########   ######  
	      ## ##          ##       ##    ##       ##   ##         ## 
	##    ## ##          ##       ##    ##       ##    ##  ##    ## 
	 ######  ########    ##       ##    ######## ##     ##  ######  
*/

	function _setFragmentsOnSide(v)
	{
		_fragmentsOnSide = v;
		_setFragmentsOnBack(v);
	}

	function _setFragmentsOnBack(v)
	{
		_fragmentsOnBack = v;
	}

	function _setUseHistory(v)
	{
		pushHistory = v;
	}

	function _setSlideInPx(v)
	{
		_slideInPx = v;
		navigateTo();
	}

	function _setSectionsSlideToTop(v)
	{
		_sectionsSlideToTop = v;
	}

	function _setGridNavigation(v)
	{
		_sectionsSlideToTop = !v;
	}

	function _setUseOverviewVariant(v)
	{
		_useOverviewVariant = v;
	}

	function _setTwoStepsSlide(v)
	{
		_twoStepsSlide = v;
	}

	function _setShowProgress(v)
	{
		_showProgress = v;
		if (_showProgress)
		{
			if (defaultProgress == null)
			{
				buildProgressIndicator();
			}
			updateProgress();
		}
		else
		{
			if (defaultProgress != null)
			{
				hideProgressIndicator();
			}
		}
	}

	function _setDefaultParallaxValues(x, y)
	{
		defaultParallaxX = x;
		defaultParallaxY = y == undefined ? defaultParallaxX : y;
		NavigationMatrix.update();
	}

	function _setParallaxInPx(v)
	{
		_parallaxInPx = v;
	}
	
	/**
	 * return object for public methods
	 */
	return {
		start: _start,
		updateNavigation: _updateNavigation,
		nextSection: _nextSection,
		prevSection: _prevSection,
		next: _nextPage,
		prev: _prevPage,
		nextFragment: _nextPage,
		prevFragment: _prevPage,
		gotoPage: _gotoPage,
		gotoHome: _gotoHome,
		gotoTop: _gotoTop,
		gotoBottom: _gotoBottom,
		gotoEnd: _gotoEnd,
		toggleOverview: _toggleOverview,
		fragmentsOnSide: _setFragmentsOnSide,
		fragmentsOnBack: _setFragmentsOnBack,
		useHistory: _setUseHistory,
		slideInPx: _setSlideInPx,
		sectionsSlideToTop: _setSectionsSlideToTop,
		gridNavigation: _setGridNavigation,
		useOverviewVariant: _setUseOverviewVariant,
		twoStepsSlide: _setTwoStepsSlide,
		showProgress: _setShowProgress,
		addEventListener: _addEventListener,
		defaultParallaxValues: _setDefaultParallaxValues,
		parallaxInPx: _setParallaxInPx,
		getDefaultProgress: _getDefaultProgress
	};
	
})();