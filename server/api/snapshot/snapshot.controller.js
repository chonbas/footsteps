/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/snapshots              ->  index
 */

'use strict';

// Gets a list of Snapshots
export function index(req, res) {
  res.json([]);
}
