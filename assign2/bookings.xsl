<?xml version="1.0" encoding="utf-8"?>
<!--
	ID: 1399273
	The XSLT stylesheet to translate the XML response into a table.
-->
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:output 
    method="html" 
    indent="yes" 
    version="4.0"
    doctype-public="-//W3C//DTD HTML 4.01//EN"
    doctype-system="http://www.w3.org/TR/html4/strict.dtd"/>
  
  <xsl:template match="/">
    <table id="bookings">
      <xsl:call-template name="DisplayBookings"></xsl:call-template>
    </table> 
  </xsl:template>


  <xsl:template name="DisplayBookings">  
    <xsl:if test="count(//booking) &gt; 0">
      <tr class="table-header">
        <td>Booking ID</td>
        <td>Name</td>
        <td>Phone</td>
        <td>Pickup</td>
        <td>Destination</td>
        <td>Date</td>
        <td>Time</td>
        <td>Assign</td>
      </tr>
    </xsl:if>

    <xsl:if test="count(/bookings/*) = 0">
    	<tr>
    		<td col-span="8"><p>No bookings in the next 2 hours.</p></td>
    	</tr>
    </xsl:if>

    <xsl:for-each select="//booking">

    	<xsl:variable name="stripe-class">
	    	<xsl:choose>
	      		<xsl:when test="position() mod 2 = 0">even</xsl:when>
	      		<xsl:otherwise>odd</xsl:otherwise>
	    	</xsl:choose>
		</xsl:variable>
		<xsl:variable name="id">
			<xsl:value-of select="id"/>
		</xsl:variable>

	  	<tr class="{$stripe-class}">
	        <td>
	          <xsl:value-of select="id"/>
	        </td>
	      
	        <td>
	          <xsl:value-of select="name"/>
	        </td>

	        <td>
	          <xsl:value-of select="phone"/>
	        </td>

	        <td>
	          <xsl:value-of select="pickup"/>
	        </td>

	        <td>
	          <xsl:value-of select="destination"/>
	        </td>

	        <td>
	          <xsl:value-of select="date"/>
	        </td>

	        <td>
	          <xsl:value-of select="time"/>
	        </td>

	        <td>
	           <input type="button" onclick="assignCab({$id})" value="Assign"/>
	        </td>
		</tr>
    </xsl:for-each>
    <br/>
  </xsl:template>
</xsl:stylesheet>